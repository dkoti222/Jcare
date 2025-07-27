
import React from 'react';
import { FlatList, View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import GlobalText from '../components/GlobalText';
import { customFonts } from '../theme/fonts';
import GlobalCard from '../components/GlobalCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';

const complaints = [
  {
    id: '123456',
    category: 'water',
    panchayat: 'Vikkiralapeta',
    status: 'Started woking',
    date: '05:21 AM ,15 jun|2024',
  },
  {
    id: '987654',
    category: 'Road',
    panchayat: 'Vikkiralapeta',
    status: 'Resolved',
    date: '05:21 AM ,15 jun|2024',
  },
];

const ComplaintList = () => {


  const renderItem = ({ item }) => {
    return (
      <GlobalCard style={styles.card}>

        <View>

          <View style={styles.rowCard}>
            <GlobalText children={'Complain No :'} fontFamily={customFonts.interRegular} fontSize={13} />
            <GlobalText children={item.id} fontFamily={customFonts.interSemi_Bold} fontSize={13} />
          </View>
            <View style={styles.rowCard}>
            <GlobalText children={'Category :'} fontFamily={customFonts.interRegular} fontSize={13} />
            <GlobalText children={item.category} fontFamily={customFonts.interSemi_Bold} fontSize={13} />
          </View>
            <View style={styles.rowCard}>
            <GlobalText children={'Panchayat :'} fontFamily={customFonts.interRegular} fontSize={13} />
            <GlobalText children={item.panchayat} fontFamily={customFonts.interSemi_Bold} fontSize={13} />
          </View>
            <View style={styles.rowCard}>
            <GlobalText children={'Status :'} fontFamily={customFonts.interRegular} fontSize={13} />
            <GlobalText children={item.status} fontFamily={customFonts.interSemi_Bold} fontSize={13} />
          </View>





        </View>
        <View style={{flexDirection:'column',justifyContent:'space-between'}}>
          <GlobalText children="05:21 AM ,15 jun|2024" fontFamily={customFonts.interSemi_Bold} fontSize={10} />
         

        </View>
         <TouchableOpacity style={styles.buttonView}>
            <GlobalText children="View" fontFamily={customFonts.interSemi_Bold} fontSize={15} color={colors.white} />
          </TouchableOpacity>



      </GlobalCard>
    )
  }
  return (
    <View style={styles.container}>
      <GlobalText children="Complaints" fontFamily={customFonts.interSemi_Bold} fontSize={20} />
      <FlatList
        data={complaints}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1)
  },
  card:{ padding: wp(2), backgroundColor:'#E1E1E1', width: wp(90), borderRadius: wp(2),flexDirection:'row',justifyContent:'space-between' },
  buttonView: {
    backgroundColor: colors.black,
    paddingVertical: hp(.8),
    alignItems: 'center',
    width: wp(30),
    borderTopLeftRadius: wp(2),
    position: 'absolute',
    bottom: 0,
    right: 0
  },

});

export default ComplaintList;
