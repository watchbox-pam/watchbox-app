import Svg, { Line, Path, ClipPath, Rect, Defs, G } from "react-native-svg";
import { StyleSheet, View } from "react-native";

export function BackgroundLine() {
	return (
		<Svg
			width="402"
			height="2200"
			viewBox="0 0 402 2200"
			fill="none"
			style={StyleSheet.absoluteFill}
			preserveAspectRatio="xMidYMid slice">
			<Defs>
				<ClipPath id="clip0">
					<Rect width="402" height="2200" fill="white" />
				</ClipPath>
			</Defs>
			<G clipPath="url(#clip0)">
				<Line
					x1="369"
					y1="347.013"
					x2="369"
					y2="-0.000274658"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Line
					x1="364"
					y1="2200"
					x2="364"
					y2="856"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Line
					x1="52"
					y1="831.018"
					x2="52"
					y2="367"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Line
					x1="64"
					y1="357"
					x2="357.091"
					y2="357"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Line
					x1="61"
					y1="844"
					x2="354.091"
					y2="844"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Path
					d="M368.999 346.792C368.999 357 369.002 357 356.001 357"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Path
					d="M52 367C52.0006 357 51.9914 357 65.0001 357"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Path
					d="M61.4991 844C52 844 51.999 844 51.9993 831"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
				<Path
					d="M354.001 844C364 844 364.001 843.999 364 855.999"
					stroke="#AC2821"
					strokeOpacity="0.9"
					strokeWidth="2"
				/>
			</G>
		</Svg>
	);
}
