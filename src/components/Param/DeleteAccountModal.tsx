import React from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";
import styles from "../../styles/ParamStyle";

type DeleteAccountModalProps = {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isDeleting: boolean;
};

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
	visible,
	onClose,
	onConfirm,
	isDeleting
}) => {
	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>
						Supprimer votre compte
					</Text>
					<Text style={styles.modalText}>
						Êtes-vous sûr de vouloir supprimer votre compte ?
						{"\n\n"}
						Cette action est{" "}
						<Text style={styles.boldText}>irréversible</Text> et
						supprimera toutes vos données, listes et historique.
					</Text>

					<View style={styles.modalButtons}>
						<TouchableOpacity
							style={[styles.modalButton, styles.cancelButton]}
							onPress={onClose}
							disabled={isDeleting}>
							<Text style={styles.cancelButtonText}>Annuler</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.modalButton, styles.deleteButton]}
							onPress={onConfirm}
							disabled={isDeleting}>
							{isDeleting ? (
								<ActivityIndicator size="small" color="#fff" />
							) : (
								<Text style={styles.deleteButtonText}>
									Supprimer
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default DeleteAccountModal;
