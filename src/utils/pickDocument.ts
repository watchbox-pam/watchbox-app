import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";

export const pickDocument = async (type: string = "*/*") => {
	try {
		const result = await DocumentPicker.getDocumentAsync({
			type,
			copyToCacheDirectory: true
		});

		if (result.canceled) {
			return null;
		}

		const selectedFile = result.assets[0];

		const file = new File(selectedFile.uri);

		return {
			name: file.name,
			size: file.size,
			uri: file.uri,
			mimeType: selectedFile.mimeType,
			file
		};
	} catch (error) {
		console.error("Error picking document:", error);
		throw error;
	}
};
