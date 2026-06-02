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
              {/* Ligne verticale droite haut */}
              <Line x1="294" y1="347.013" x2="294" y2="-0.000274658" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Ligne verticale droite milieu (entre les deux virages) */}
              <Line x1="289" y1="1197" x2="289" y2="856" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Ligne verticale droite bas (après le 2e virage) */}
              <Line x1="289" y1="2200" x2="289" y2="1609" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Ligne verticale gauche - 1er virage */}
              <Line x1="127" y1="831.018" x2="127" y2="367" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Ligne verticale gauche - 2e virage */}
              <Line x1="127" y1="1584" x2="127" y2="1217" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Horizontale haut - 1er virage */}
              <Line x1="139" y1="357" x2="282.091" y2="357" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Horizontale bas - 1er virage */}
              <Line x1="136" y1="844" x2="279.091" y2="844" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Horizontale haut - 2e virage */}
              <Line x1="139" y1="1207" x2="282.091" y2="1207" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Horizontale bas - 2e virage */}
              <Line x1="136" y1="1597" x2="279.091" y2="1597" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Coins 1er virage */}
              <Path d="M293.999 346.792C293.999 357 294.002 357 281.001 357" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
              <Path d="M127 367C127.0006 357 126.9914 357 140.0001 357" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
              <Path d="M136.4991 844C127 844 126.999 844 126.9993 831" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
              <Path d="M279.001 844C289 844 289.001 843.999 289 855.999" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />

              {/* Coins 2e virage */}
              <Path d="M288.999 1196.792C288.999 1207 289.002 1207 276.001 1207" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
              <Path d="M127 1217C127.0006 1207 126.9914 1207 140.0001 1207" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
              <Path d="M136.4991 1597C127 1597 126.999 1597 126.9993 1584" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
              <Path d="M279.001 1597C289 1597 289.001 1596.999 289 1608.999" stroke="#AC2821" strokeOpacity="0.9" strokeWidth="2" />
            </G>
		</Svg>
	);
}
