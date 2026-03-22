import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/ParamStyle";

type ClearCacheModalProps = {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	cacheSize: string;
};

const ClearCacheModal: React.FC<ClearCacheModalProps> = ({
	visible,
	onClose,
	onConfirm,
	cacheSize
}) => {
	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Vider le cache</Text>
					<Text style={styles.modalText}>
						Êtes-vous sûr de vouloir vider le cache ?{"\n\n"}
						Taille actuelle : {cacheSize}
					</Text>

					<View style={styles.modalButtons}>
						<TouchableOpacity
							style={[styles.modalButton, styles.cancelButton]}
							onPress={onClose}>
							<Text style={styles.cancelButtonText}>Annuler</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.modalButton, styles.deleteButton]}
							onPress={onConfirm}>
							<Text style={styles.deleteButtonText}>Vider</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ClearCacheModal;
