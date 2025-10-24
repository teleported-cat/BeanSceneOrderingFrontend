{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader.js';
import { API_BASE_URL } from '../../components/APIAddress.js';
import ImageFallback from '../../components/ImageFallback.js';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function Reports({props}) {
    const [orderData, setOrderData] = useState([]);

    const [orderCompositionData, setOrderCompositionData] = useState([
        {
            name: "Pending",
            orders: 0,
            color: '#4AA1B5',
            legendFontColor: "#000000",
            legendFontSize: 16,
        },
        {
            name: "In Progress",
            orders: 0,
            color: '#083944',
            legendFontColor: "#000000",
            legendFontSize: 16,
        },
        {
            name: "Completed",
            orders: 0,
            color: '#008000',
            legendFontColor: "#000000",
            legendFontSize: 16,
        },
        {
            name: "Cancelled",
            orders: 0,
            color: '#FF3030',
            legendFontColor: "#000000",
            legendFontSize: 16,
            
        },
    ]);
    const [orderActivityData, setOrderActivityData] = useState({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    });

    const isFocused = useIsFocused();

    const screenWidth = Dimensions.get("window").width;

    const dummyOrderComposition = [
        {
            name: "Pending",
            orders: 1,
            color: '#4AA1B5',
            legendFontColor: "#000000",
            legendFontSize: 16,
        },
        {
            name: "In Progress",
            orders: 4,
            color: '#083944',
            legendFontColor: "#000000",
            legendFontSize: 16,
        },
        {
            name: "Completed",
            orders: 12,
            color: '#008000',
            legendFontColor: "#000000",
            legendFontSize: 16,
        },
        {
            name: "Cancelled",
            orders: 7,
            color: '#FF3030',
            legendFontColor: "#000000",
            legendFontSize: 16,
            
        },
    ];

    const dummyOrderActivity = {
        labels: ['18/10','19/10','20/10','21/10','22/10','23/10','24/10'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 54]
            }
        ]
    };

    const orderCompositionConfig = {
        backgroundGradientFrom: "rgba(255, 255, 255, 0)",
        backgroundGradientTo: "rgba(255, 255, 255, 0)",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `#4AA1B5`,
        labelColor: (opacity = 1) => `#000000`,
        barPercentage: 0.75,
        decimalPlaces: 0, 
    };

    const orderActivityConfig = {
        backgroundGradientFrom: "rgba(255, 255, 255, 0)",
        backgroundGradientTo: "rgba(255, 255, 255, 0)",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `#4AA1B5`,
        labelColor: (opacity = 1) => `#000000`,
        barPercentage: 0.75,
        decimalPlaces: 0, 
    };

    const getOrders = async () => {
        var url = API_BASE_URL + "/Orders";
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            retrieveCompositionData(data);
            retrieveActivityData(data);
            setOrderData(data);
        } catch (error) {
            console.log("GET Orders failed: " + error.message);
        }
    };

    const retrieveCompositionData = (data) => {
        // Get all orders from today
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todaysOrders = data.filter(o => {
            const orderDate = new Date(o.datetime);
            const orderDay = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
            return orderDay.getTime() === today.getTime();
        });
        
        // Set blank data
        const tempData = [
            {
                name: "Pending",
                orders: 0,
                color: '#4AA1B5',
                legendFontColor: "#000000",
                legendFontSize: 16,
            },
            {
                name: "In Progress",
                orders: 0,
                color: '#083944',
                legendFontColor: "#000000",
                legendFontSize: 16,
            },
            {
                name: "Completed",
                orders: 0,
                color: '#008000',
                legendFontColor: "#000000",
                legendFontSize: 16,
            },
            {
                name: "Cancelled",
                orders: 0,
                color: '#FF3030',
                legendFontColor: "#000000",
                legendFontSize: 16,
            },
        ];

        // For each order, find the status and increment it by one in the data
        todaysOrders.forEach((order) => {
            tempData.find(d => d.name == order.status).orders++;
        });
        setOrderCompositionData(tempData);
    };

    const retrieveActivityData = (data) => {
        const now = new Date();
        console.log(now);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        console.log(today);

        const tempData = {
            labels: [],
            datasets: [
                {
                    data: []
                }
            ]
        };
        
        // Get number of orders for today and past 6 days
        for (let i = 0; i > -7; i--) {
            tempData.labels.unshift(`${today.getDate()}/${today.getMonth() + 1}`)
            tempData.datasets[0].data.unshift(numberOfOrdersOnDate(data, today))
            today.setDate(today.getDate() - 1);
        }

        console.log(tempData);
        setOrderActivityData(tempData);
    };

    const numberOfOrdersOnDate = (data, date) => {
        const ordersOnDate = data.filter(o => {
            const orderDate = new Date(o.datetime);
            const orderDay = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
            return orderDay.getTime() === date.getTime();
        });
        return ordersOnDate.length;
    };

    useEffect(() => {
        if (isFocused) {
            getOrders();
        }
    }, [props, isFocused])

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Order Composition Header */}
                    <View style={[Style.listHeader, Style.orderHeader]}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Order Composition</Text>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Today</Text>
                    </View>

                    <View style={Style.chartBox}>
                        <PieChart
                            style={Style.regularText}
                            data={orderCompositionData}
                            width={screenWidth - 20}
                            height={220}
                            chartConfig={orderCompositionConfig}
                            accessor={"orders"}
                            backgroundColor={"transparent"}
                            absolute
                        />
                    </View>

                    {/* Order Activity Header */}
                    <View style={[Style.listHeader, Style.orderHeader]}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Order Activity</Text>
                        <Text style={[Style.listHeaderText, Style.boldText]}>This Week</Text>
                    </View>

                    {/* Order Activity Chart */}
                    <View style={Style.chartBox}>
                        <BarChart 
                            style={[Style.barChart, Style.regularText]}
                            data={orderActivityData}
                            width={screenWidth + 14}
                            height={220}
                            chartConfig={orderActivityConfig}
                            fromZero
                            showValuesOnTopOfBars
                            yLabelsOffset={0}
                            withInnerLines={false}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}