import React, { useState, useRef } from 'react';
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
    ActivityIndicator,
    Animated,
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
import Video from 'react-native-video';
import { supabase } from '../supabaseClient';
import uuid from 'react-native-uuid';
import RNFS from 'react-native-fs';
import { decode } from 'base64-arraybuffer';

const HomeScreen = ({ navigation }) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [district, setDistrict] = useState(null);
    const [mandal, setMandal] = useState(null);
    const [panchayat, setPanchayat] = useState(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const handleAddMedia = () => {
        if (mediaFiles.length >= 3) {
            Alert.alert('Limit Reached', 'You can only upload up to 3 files.');
            return;
        }

        Alert.alert(
            'Upload Media',
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
                        message: 'App needs camera access to take a photo or video',
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
                mediaType: 'mixed',
                quality: 0.7,
                videoQuality: 'low',
                durationLimit: 60,
                saveToPhotos: true,
            };

            launchCamera(options, (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
                    return;
                }

                if (response.assets && response.assets.length > 0) {
                    setMediaFiles((prev) => [...prev, response.assets[0]]);
                }
            });
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

    const openGallery = () => {
        const remainingSlots = 3 - mediaFiles.length;

        const options = {
            mediaType: 'mixed',
            quality: 0.7,
            selectionLimit: remainingSlots,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                Alert.alert('Gallery Error', response.errorMessage || 'Unknown error');
                return;
            }

            if (response.assets && response.assets.length > 0) {
                const allFiles = [...mediaFiles, ...response.assets];
                const uniqueFiles = Array.from(new Set(allFiles.map(f => f.uri)))
                    .map(uri => allFiles.find(f => f.uri === uri));
                setMediaFiles(uniqueFiles);
            }
        });
    };

    const handleSubmit = async () => {
        if (!district || !mandal || !panchayat) {
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

        if (mediaFiles.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'No Files',
                text2: 'Please upload at least one file.',
                visibilityTime: 1500,
                position: 'bottom',
            });
            return;
        }

        setIsLoading(true);

        try {
            const uploadedUrls = [];

            for (const file of mediaFiles) {
                const ext = file.fileName?.split('.').pop() || 'jpg';
                const uniqueName = `${uuid.v4()}.${ext}`;
                const path = file.uri.replace('file://', '');

                const base64Data = await RNFS.readFile(path, 'base64');
                const arrayBuffer = decode(base64Data);

                const { error: uploadError } = await supabase.storage
                    .from('media')
                    .upload(`public/${uniqueName}`, arrayBuffer, {
                        contentType: file.type || 'image/jpeg',
                    });

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('media').getPublicUrl(`public/${uniqueName}`);
                uploadedUrls.push(data.publicUrl);
            }

            const { error: insertError } = await supabase.from('complaints').insert([
                {
                    status: 'Pending',
                    district,
                    mandal,
                    panchayat,
                    description,
                    media_urls: uploadedUrls,
                    created_at: new Date().toISOString(),
                },
            ]);

            if (insertError) throw insertError;

            Toast.show({
                type: 'success',
                text1: 'Complaint Submitted!',
                text2: 'Thank you for your feedback.',
                visibilityTime: 2000,
                position: 'bottom',
            });

            setDistrict(null);
            setMandal(null);
            setPanchayat(null);
            setDescription('');
            setMediaFiles([]);
            setShowSuccess(true);

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]).start();

            // Optional: hide success message after 5s
            setTimeout(() => {
                setShowSuccess(false);
                fadeAnim.setValue(0);
                slideAnim.setValue(20);
            }, 5000);

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to upload complaint. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                {isLoading && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                )}

                <View style={styles.profileWrapper}>
                    <View style={styles.locationRow}>
                        <View style={styles.circle}>
                            <GlobalText children={'A'} />
                        </View>
                        <GlobalText
                            children={'Hello Avinash'}
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

                <View style={styles.dropdownWrapper}>
                    <GlobalDropDown
                        open={openDropdownIndex === 0}
                        setOpen={(open) => setOpenDropdownIndex(open ? 0 : null)}
                        value={district}
                        setValue={setDistrict}
                        items={[
                            { label: 'Prakasam', value: 'prakasam' },
                            { label: 'Guntur', value: 'guntur' },
                            { label: 'visakhapatnam', value: 'visakhapatnam' },
                            { label: 'vijayawada', value: 'vijayawada' },
                        ]}
                        placeholder="Select District"
                        zIndex={999}
                        zIndexInverse={3999}
                    />
                    <GlobalDropDown
                        open={openDropdownIndex === 1}
                        setOpen={(open) => setOpenDropdownIndex(open ? 1 : null)}
                        value={mandal}
                        setValue={setMandal}
                        items={[
                            { label: 'Kandukur', value: 'kandukur' },
                            { label: 'Chirala', value: 'chirala' },
                            { label: 'Nandigama', value: 'nandigama' },
                            { label: 'Chilakaluripet', value: 'chilakaluripet' },
                        ]}
                        placeholder="Select Mandal"
                        zIndex={998}
                        zIndexInverse={3998}
                    />
                    <GlobalDropDown
                        open={openDropdownIndex === 2}
                        setOpen={(open) => setOpenDropdownIndex(open ? 2 : null)}
                        value={panchayat}
                        setValue={setPanchayat}
                        items={[
                            { label: 'Panchayat A', value: 'a' },
                            { label: 'Panchayat B', value: 'b' },
                            { label: 'Panchayat C', value: 'c' },
                        ]}
                        placeholder="Select Panchayat"
                        zIndex={997}
                        zIndexInverse={3997}
                    />
                </View>

                <View style={styles.photoTextRow}>
                    <TouchableOpacity onPress={handleAddMedia}>
                        <MaterialIcons name="add-photo-alternate" size={30} color="black" />
                    </TouchableOpacity>
                    <GlobalText
                        children={'Upload Media'}
                        fontSize={18}
                        fontFamily={customFonts.interSemi_Bold}
                    />
                </View>

                <View style={styles.photoPreviewRow}>
                    {mediaFiles.map((file, index) => {
                        const fileType = file.type || '';
                        return (
                            <View key={index} style={styles.photoBox}>
                                {fileType.startsWith('image') && (
                                    <Image source={{ uri: file.uri }} style={styles.photoThumbnail} />
                                )}
                                {fileType.startsWith('video') && (
                                    <Video
                                        source={{ uri: file.uri }}
                                        style={styles.photoThumbnail}
                                        resizeMode="cover"
                                        muted
                                        repeat
                                        paused
                                    />
                                )}
                                {fileType.startsWith('audio') && (
                                    <TouchableOpacity
                                        onPress={() => Alert.alert('Audio File', 'Playing audio not implemented')}
                                        style={[styles.photoThumbnail, { justifyContent: 'center', alignItems: 'center' }]}
                                    >
                                        <MaterialIcons name="audiotrack" size={24} color="black" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </View>

                <GlobalTextInput
                    placeholder="Please provide a detailed description of your complaint.........."
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    inputStyle={{ height: hp(9) }}
                    textAlignVertical="top"
                    containerStyle={{ alignSelf: 'center' }}
                />

                <GlobalButton
                    title="Submit"
                    containerStyle={{ marginTop: hp(2), alignSelf: 'center' }}
                    onPress={handleSubmit}
                    disabled={isLoading}
                />

                {showSuccess && (
                    <Animated.View
                        style={[
                            styles.successContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                         <View style={{width:wp(80),alignSelf:'center',borderRadius:wp(8),paddingVertical:hp(2)}}>
                         <Image
                            source={require('../../src/assets/images/ys.png')} 
                            style={styles.successImage}
                            resizeMode="contain"
                        
                        />
                        <GlobalText style={styles.successText} children="Nenu vinnanu" />
                        <GlobalText style={styles.successText} children="Nenu unnanu" />
                         </View>
                    
                    </Animated.View>
                )}
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
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    successContainer: {
        position: 'absolute',
        bottom:hp(5),
        left: 0,
        right: 0,
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        zIndex: 1000,
    },
    successImage: {
        width: wp(50),
        height: wp(30),
        alignSelf: 'center',
        marginBottom: hp(1),
    },
    successText: {
        fontSize: wp(6),
        fontFamily: customFonts.interBold,
        color:'green',
        textAlign: 'center',
        letterSpacing:1
        
   
    
    },
});
