import {
    StyleSheet,
} from 'react-native';

const Align = StyleSheet.create({
    lLayout: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    rLayout: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },

    centerView: {
        alignSelf: "center"
    },

    center: {
        justifyContent: "center",
        alignItems: "center"
    },

    vCenter: {
        alignItems: "center"
    },

    hCenter: {
        justifyContent: "center",
        alignItems: "center"
    },

    tLayout: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },

    bLayout: {
        flexDirection: "column",
        justifyContent: "flex-end"
    }

})

export default Align