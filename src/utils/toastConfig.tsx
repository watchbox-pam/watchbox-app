// App.jsx
import Toast, {
	BaseToast,
	ErrorToast,
	ToastConfigParams
} from "react-native-toast-message";

/*
  1. Create the config
*/
export const toastConfig = {
	/*
	  Overwrite 'success' type,
	  by modifying the existing `BaseToast` component
	*/
	success: (props: ToastConfigParams<any>) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: "green", backgroundColor: "#13396A" }}
			text1Style={{
				fontSize: 17,
				color: "white"
			}}
			text2Style={{
				fontSize: 15,
				color: "white"
			}}
		/>
	),
	/*
  Overwrite 'error' type,
  by modifying the existing `ErrorToast` component
*/
	error: (props: ToastConfigParams<any>) => (
		<ErrorToast
			{...props}
			style={{ borderLeftColor: "red", backgroundColor: "#13396A" }}
			text1Style={{
				fontSize: 17,
				color: "white"
			}}
			text2Style={{
				fontSize: 15,
				color: "white"
			}}
		/>
	)
};
