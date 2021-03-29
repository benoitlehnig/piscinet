import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import {
	AngularFireStorage,
	AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';


import {Picture} from '../models/swimming-pool';

export interface FilesUploadMetadata {
	uploadProgress$: Observable<number>;
	downloadUrl$: Observable<string>;
}



const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class PhotoService {

	public pictures: Picture[] = [];

	constructor(
		private readonly storage: AngularFireStorage
		) { }

	public async addNewToGallery(poolId,accountId) {
		// Take a photo
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Uri, 
			source: CameraSource.Camera, 
			quality: 100 
		});
		const savedImageFile = await this.savePicture(poolId,accountId,capturedPhoto);

		this.pictures.unshift({
			name:"",
			type:"",
			filepath: "soon...",
			webviewPath: capturedPhoto.webPath
		});
	}

	private async savePicture(poolId,accountId,cameraPhoto: CameraPhoto) {
		// Convert photo to base64 format, required by Filesystem API to save
		const base64Data = await this.readAsBase64(cameraPhoto);

		// Write the file to the data directory
		const fileName = new Date().getTime() + '.jpeg';
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: base64Data,
			directory: FilesystemDirectory.Data
		});

		console.log("fileName",fileName,base64Data);
		const mediaFolderPath = accountId+'/pools/'+poolId+'/pictures/';
			let returnData = this.uploadFileAndGetMetadata(
				mediaFolderPath,
				base64Data,
				);

			returnData.downloadUrl$.subscribe(data=>{
				data;
			});
		// Use webPath to display the new image instead of base64 since it's
		// already loaded into memory
		return {
			filepath: fileName,
			webviewPath: cameraPhoto.webPath
		};
	}
	private async readAsBase64(cameraPhoto: CameraPhoto) {
		// Fetch the photo, read as a blob, then convert to base64 format
		const response = await fetch(cameraPhoto.webPath!);
		const blob = await response.blob();

		return await this.convertBlobToBase64(blob) as string;  
	}

	convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
		const reader = new FileReader;
		reader.onerror = reject;
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(blob);
	});

	uploadFileAndGetMetadata(
		mediaFolderPath: string,
		fileToUpload: string,
		): FilesUploadMetadata {
		var storageRef = this.storage.ref(mediaFolderPath);
		console.log("uploadFileAndGetMetadata", mediaFolderPath, fileToUpload)
		const uploadTask: AngularFireUploadTask = storageRef.putString(
			fileToUpload, 
			'data_url'
			);
		return {
			uploadProgress$: uploadTask.percentageChanges(),
			downloadUrl$: this.getDownloadUrl$(uploadTask, mediaFolderPath),
		};
	}

	private getDownloadUrl$(
		uploadTask: AngularFireUploadTask,
		path: string,
		): Observable<string> {
		return from(uploadTask).pipe(
			switchMap((_) => this.storage.ref(path).getDownloadURL()),
			);
	}


}
