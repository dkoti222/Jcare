import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ComplaintScreen = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);

    const fullDescription = `Dear minister Sir,
I am writing to highlight a critical water supply issue in vikkiralapeta. For two years, we’ve faced irregular water service, especially during summers. This affects daily life and sanitation. Kindly address this with urgency.`;

    const shortDescription = fullDescription.split('\n').slice(0, 2).join('\n');

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={20} color="#000" />
                <Text style={styles.headerText}>Complaint</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Complaint Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.complaintId}># 123456</Text>
                        <Text style={styles.time}>05:21 AM ,15 jun|2024</Text>
                    </View>

                    <Text style={styles.info}><Text style={styles.label}>Panchayat :</Text> Guntur</Text>
                    <Text style={styles.info}><Text style={styles.label}>Mandal :</Text> water</Text>
                    <Text style={styles.info}><Text style={styles.label}>District :</Text> Started woking</Text>
                    <Text style={styles.info}><Text style={styles.label}>Panchayat level :</Text> Started woking</Text>

                    {/* Image Row */}
                    <View style={styles.imageRow}>
                        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.image} />
                        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.image} />
                        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.image} />
                    </View>

                    {/* Description */}
                    <Text style={styles.description}>
                        <Text style={styles.label}>Description: </Text>
                        {expanded ? fullDescription : shortDescription}{' '}
                        <Text onPress={toggleExpand} style={styles.viewMore}>
                            {expanded ? 'show less' : 'view more'}
                        </Text>
                    </Text>
                </View>

                {/* Chat Bubbles */}
                <View style={styles.chatContainer}>
                    {/* User Message */}
                    <View style={styles.userBubble}>
                        <Text style={styles.userText}>Hello sir, may i know the status of my complaint?</Text>
                        <Text style={styles.timeSmall}>08:15 AM</Text>
                    </View>

                    {/* Assistant Message */}
                    <View style={styles.assistantBubbleContainer}>
                        <View style={styles.assistantAvatar}>
                            <Text style={styles.avatarText}>G</Text>
                        </View>
                        <View style={styles.assistantBubble}>
                            <Text style={styles.assistantText}>
                                Hello Hemanth, we started working on your water issue.
                            </Text>
                            <Text style={styles.timeSmall}>08:16 AM</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Ask any query......"
                    placeholderTextColor="#888"
                    style={styles.input}
                />
                <TouchableOpacity>
                    <Icon name="send" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Resolved Button */}
            <TouchableOpacity style={styles.resolvedButton}>
                <Text style={styles.resolvedText}>Resolved</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ComplaintScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
    },
    content: {
        padding: 16,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    complaintId: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    time: {
        fontSize: 12,
        color: '#555',
    },
    info: {
        marginTop: 4,
        fontSize: 13,
    },
    label: {
        fontWeight: 'bold',
    },
    imageRow: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 8,
    },
    image: {
        width: 80,
        height: 60,
        borderRadius: 6,
    },
    description: {
        marginTop: 10,
        fontSize: 13,
        lineHeight: 18,
    },
    viewMore: {
        color: 'blue',
        fontSize: 13,
    },
    chatContainer: {
        marginTop: 10,
        gap: 10,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 12,
        maxWidth: '80%',
    },
    userText: {
        color: '#fff',
        fontSize: 13,
    },
    timeSmall: {
        fontSize: 10,
        color: '#777',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    assistantBubbleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    assistantAvatar: {
        backgroundColor: '#000',
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    assistantBubble: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 12,
        maxWidth: '80%',
    },
    assistantText: {
        fontSize: 13,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fafafa',
    },
    input: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 8,
    },
    resolvedButton: {
        backgroundColor: '#000',
        paddingVertical: 14,
        alignItems: 'center',
    },
    resolvedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
