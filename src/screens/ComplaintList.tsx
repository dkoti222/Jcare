import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import GlobalText from '../components/GlobalText';
import { customFonts } from '../theme/fonts';
import GlobalCard from '../components/GlobalCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { supabase } from '../supabaseClient';

const ComplaintList = ({ navigation }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const formattedTime = `${hour12.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();

    return `${formattedTime} ,${day} ${month}|${year}`;
  };

  const fetchComplaints = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('complaints').select('*');

    if (error) {
      Alert.alert('Error', 'Failed to fetch complaints');
      console.error(error);
    } else {
      setComplaints(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <GlobalCard style={styles.card}>
        <View>
          <View style={styles.rowCard}>
            <GlobalText
              children={'Complain No :'}
              fontFamily={customFonts.interRegular}
              fontSize={13}
            />
            <GlobalText
              children={item.id?.slice(0, 5)}
              fontFamily={customFonts.interSemi_Bold}
              fontSize={13}
              numberOfLines={1}
            />
          </View>
          <View style={styles.rowCard}>
            <GlobalText
              children={'District :'}
              fontFamily={customFonts.interRegular}
              fontSize={13}
            />
            <GlobalText
              children={item.district}
              fontFamily={customFonts.interSemi_Bold}
              fontSize={13}
            />
          </View>
          <View style={styles.rowCard}>
            <GlobalText
              children={'Panchayat :'}
              fontFamily={customFonts.interRegular}
              fontSize={13}
            />
            <GlobalText
              children={item.panchayat}
              fontFamily={customFonts.interSemi_Bold}
              fontSize={13}
            />
          </View>
          <View style={styles.rowCard}>
            <GlobalText
              children={'Status :'}
              fontFamily={customFonts.interRegular}
              fontSize={13}
            />
            <GlobalText
              children={item.status}
              fontFamily={customFonts.interSemi_Bold}
              fontSize={13}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <GlobalText
            children={formatTimestamp(item.created_at)}
            fontFamily={customFonts.interSemi_Bold}
            fontSize={10}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate('ComplaintScreen',{complaintData:item})}
        >
          <GlobalText
            children="View"
            fontFamily={customFonts.interSemi_Bold}
            fontSize={15}
            color={colors.white}
          />
        </TouchableOpacity>
      </GlobalCard>
    );
  };

  return (
    <View style={styles.container}>
      <GlobalText
        children="Complaints"
        fontFamily={customFonts.interSemi_Bold}
        fontSize={20}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.black} style={{ marginTop: hp(5) }} />
      ) : (
        <FlatList data={complaints} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: hp(5) }}>
            <GlobalText
              children="No complaints found"
              fontFamily={customFonts.interSemi_Bold}
              fontSize={15}
            />
          </View>
        )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: hp(2),
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  card: {
    padding: wp(2),
    backgroundColor: '#E1E1E1',
    width: wp(90),
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  buttonView: {
    backgroundColor: colors.black,
    paddingVertical: hp(0.8),
    alignItems: 'center',
    width: wp(30),
    borderTopLeftRadius: wp(2),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default ComplaintList;
