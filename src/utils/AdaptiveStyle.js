import {PixelRatio, Dimensions, StyleSheet} from 'react-native';

const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = px => PixelRatio.roundToNearestPixel(px);

let designSize = {width: 750, height: 1336};

let pxRatio = PixelRatio.get();
let {win_width, win_height} = Dimensions.get("window");

let width = dp2px(win_width);
let height = dp2px(win_height);

let design_scale = designSize.width / width;
height = height * design_scale;

let scale = 1 / pxRatio / design_scale;


const AdaptiveStyle = StyleSheet.create({
    container: {
        width: width,
        height: height,
        transform: [
            {translateX: -width * .5},
            {translateY: -height * .5},
            {scale: scale},
            {translateX: width * .5},
            {translateY: height * .5}
        ]
    }
})

export default AdaptiveStyle;


