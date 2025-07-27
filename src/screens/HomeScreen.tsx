import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    PermissionsAndroid,
    Platform,
    Image,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import GlobalText from '../components/GlobalText';
import GlobalDropDown from '../components/GlobalDropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { customFonts } from '../theme/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalButton from '../components/GlobalButton';
import GlobalTextInput from '../components/GlobalTextInput';
import { colors } from '../theme/colors';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }) => {
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('');

    const [panchayatLevel, setPanchayatLevel] = useState(null);
    const [district, setDistrict] = useState(null);
    const [mandal, setMandal] = useState(null);
    const [panchayat, setPanchayat] = useState(null);
    const [category, setCategory] = useState(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

    const handleAddPhoto = () => {
        if (photos.length >= 3) {
            Alert.alert('Limit Reached', 'You can only upload up to 3 photos.');
            return;
        }

        Alert.alert(
            'Upload Photo',
            'Choose an option',
            [
                { text: 'Camera', onPress: openCamera },
                { text: 'Gallery', onPress: openGallery },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    const openCamera = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera access to take a photo',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel',
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'Camera access is required.');
                    return;
                }
            }

            const options = {
                mediaType: 'photo',
                quality: 0.7,
                saveToPhotos: true,
            };

            launchCamera(options, (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
                    return;
                }

                if (response.assets && response.assets.length > 0) {
                    setPhotos((prev) => [...prev, response.assets[0]]);
                }
            });
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.7,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                Alert.alert('Gallery Error', response.errorMessage || 'Unknown error');
                return;
            }

            if (response.assets && response.assets.length > 0) {
                setPhotos((prev) => [...prev, response.assets[0]]);
            }
        });
    };

    const handleSubmit = () => {
        if (!panchayatLevel || !district || !mandal || !panchayat || !category) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please select all dropdowns',
                visibilityTime: 1500,
                position: 'bottom',
            });
            return;
        }

        if (description.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Description Required',
                text2: 'Please write a short description.',
                visibilityTime: 1500,
                position: 'bottom',
            });
            return;
        }

        if (photos.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'No Photos',
                text2: 'Please upload at least one photo.',
                visibilityTime: 1500,
                position: 'bottom',
            });
            return;
        }

        const formData = {
            panchayatLevel,
            district,
            mandal,
            panchayat,
            category,
            description,
            photos,
        };

        console.log('Submitted:', formData);

        Toast.show({
            type: 'success',
            text1: 'Complaint Submitted!',
            text2: 'Thank you for your feedback.',
            visibilityTime: 2000,
            position: 'bottom',
            

            
        
        });
        setPanchayatLevel(null);
        setDistrict(null);
        setMandal(null);
        setPanchayat(null);
        setCategory(null);
        setDescription('');
        setPhotos([]);

    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.profileWrapper}>
                    <View style={styles.locationRow}>
                        <View style={styles.circle}>
                            <GlobalText children={'H'} />
                        </View>
                        <GlobalText
                            children={'Hello Hemanth'}
                            fontSize={14}
                            fontFamily={customFonts.interMedium}
                        />
                    </View>
                    <View style={styles.locationRow}>
                        <MaterialIcons name="location-pin" size={wp(5)} color="black" />
                        <GlobalText
                            children={'Kandukur'}
                            fontSize={14}
                            fontFamily={customFonts.interMedium}
                        />
                    </View>
                </View>

                {/* Dropdowns */}
                <View style={styles.dropdownWrapper}>
                    <GlobalDropDown
                        open={openDropdownIndex === 0}
                        setOpen={(open) => setOpenDropdownIndex(open ? 0 : null)}
                        value={panchayatLevel}
                        setValue={setPanchayatLevel}
                        items={[
                            { label: 'Gram Panchayat', value: 'gram' },
                            { label: 'Mandal Panchayat', value: 'mandal' },
                        ]}
                        placeholder="Select Panchayat Level"
                        zIndex={1000}
                        zIndexInverse={4000}
                    />
                    <GlobalDropDown
                        open={openDropdownIndex === 1}
                        setOpen={(open) => setOpenDropdownIndex(open ? 1 : null)}
                        value={district}
                        setValue={setDistrict}
                        items={[
                            { label: 'Prakasam', value: 'prakasam' },
                            { label: 'Guntur', value: 'guntur' },
                        ]}
                        placeholder="Select District"
                        zIndex={999}
                        zIndexInverse={3999}
                    />
                    <GlobalDropDown
                        open={openDropdownIndex === 2}
                        setOpen={(open) => setOpenDropdownIndex(open ? 2 : null)}
                        value={mandal}
                        setValue={setMandal}
                        items={[
                            { label: 'Kandukur', value: 'kandukur' },
                            { label: 'Chirala', value: 'chirala' },
                        ]}
                        placeholder="Select Mandal"
                        zIndex={998}
                        zIndexInverse={3998}
                    />
                    <GlobalDropDown
                        open={openDropdownIndex === 3}
                        setOpen={(open) => setOpenDropdownIndex(open ? 3 : null)}
                        value={panchayat}
                        setValue={setPanchayat}
                        items={[
                            { label: 'Panchayat A', value: 'a' },
                            { label: 'Panchayat B', value: 'b' },
                        ]}
                        placeholder="Select Panchayat"
                        zIndex={997}
                        zIndexInverse={3997}
                    />
                    <GlobalDropDown
                        open={openDropdownIndex === 4}
                        setOpen={(open) => setOpenDropdownIndex(open ? 4 : null)}
                        value={category}
                        setValue={setCategory}
                        items={[
                            { label: 'Water Issue', value: 'water' },
                            { label: 'Electricity Issue', value: 'electricity' },
                        ]}
                        placeholder="Select Complaint Category"
                        zIndex={996}
                        zIndexInverse={3996}
                    />
                </View>

                {/* Photo Upload */}
                <View style={styles.photoTextRow}>
                    <TouchableOpacity onPress={handleAddPhoto}>
                        <MaterialIcons name="add-photo-alternate" size={30} color="black" />
                    </TouchableOpacity>
                    <GlobalText
                        children={'Upload Photos'}
                        fontSize={18}
                        fontFamily={customFonts.interSemi_Bold}
                    />
                </View>

                <View style={styles.photoPreviewRow}>
                    {photos.map((photo, index) => (
                        <View key={index} style={styles.photoBox}>
                            <Image source={{ uri: photo.uri }} style={styles.photoThumbnail} />
                        </View>
                    ))}
                </View>

                {/* Description */}
                <GlobalTextInput
                    placeholder="Please provide a detailed description of your complaint.........."
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    inputStyle={{ height: hp(9) }}
                    textAlignVertical="top"
                    containerStyle={{ alignSelf: 'center' }}
                />

                {/* Submit */}
                <GlobalButton
                    title="Submit"
                    containerStyle={{ marginTop: hp(2), alignSelf: 'center' }}
                    onPress={handleSubmit}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingTop: wp(5),
        paddingBottom: hp(10),
    },
    profileWrapper: {
        marginBottom: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp(90),
        alignSelf: 'center',
    },
    circle: {
        height: wp(10),
        width: wp(10),
        borderWidth: 2,
        borderColor: colors.gray,
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(2),
    },
    dropdownWrapper: {
        width: wp(90),
        gap: wp(2),
        alignSelf: 'center',
    },
    photoTextRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: wp(1),
        width: wp(90),
        marginVertical: hp(2),
    },
    photoPreviewRow: {
        flexDirection: 'row',
        gap: wp(2),
        flexWrap: 'wrap',
        paddingHorizontal: wp(5),
    },
    photoBox: {
        width: wp(15),
        height: wp(15),
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: hp(2),
    },
    photoThumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
