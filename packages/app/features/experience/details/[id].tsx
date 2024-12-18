import { View } from 'app/design/view'
import { Text, P, H1 } from 'app/design/typography'
import { TouchableOpacity, Image, ImageBackground, ScrollView, Platform } from 'react-native'
import { useRouter } from 'solito/router'

export function ExperienceDetailsScreen() {
    const router = useRouter()

    return (
        <View className="flex-1 bg-black">
            <ScrollView className="flex-1">
                <View className="relative">
                    <ImageBackground
                        source={{ uri: 'https://storage.googleapis.com/what-is-utopia/bear.png' }}
                        className={Platform.select({
                            web: 'w-full h-[500px]',
                            default: 'w-full h-[55vh]'
                        })}
                        resizeMode={Platform.select({
                            web: 'contain',
                            default: 'cover'
                        })}
                    >
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="absolute top-10 left-5 z-10 bg-black/50 rounded-full w-10 h-10 items-center justify-center"
                        >
                            <Text className="text-white text-2xl">&lt;</Text>
                        </TouchableOpacity>
                    </ImageBackground>

                    <View className="p-5">
                        <Text className="text-2xl font-medium text-white">
                            Macy's Thanksgiving Parade VIP Package
                        </Text>
                        <View className="flex-row items-center mt-2">
                            <Text className="text-yellow-500">500 Pts</Text>
                            <Text className="text-gray-400 mx-2">•</Text>
                            <Text className="text-gray-400">New York</Text>
                            <Text className="text-gray-400 mx-2">•</Text>
                            <Text className="text-gray-400">Nov-24</Text>
                        </View>

                        <View className="mt-6">
                            <H1 className="text-lg font-semibold text-white mb-2">About</H1>
                            <P className="text-gray-400 leading-6 mb-[300px]">
                                The Fashion Awards, formerly known as the British Fashion Awards, is an annual ceremony established in the United Kingdom in 1989 to recognize both British and international individuals and businesses who have made significant contributions to the fashion industry. Organized by the British Fashion Council, the event serves as the primary fundraiser for the BFC's Education Foundation, a charity that supports excellence in design by providing financial assistance to students with exceptional talent and potential.
                                The Fashion Awards celebrate various aspects of the fashion industry, including design, accessories, business leadership, and urban luxury. The Designer of the Year award recognizes an international designer whose innovative collections have made a notable impact on the industry, shaping global fashion trends. The Accessories Designer of the Year award honors a designer who has elevated accessories to the forefront of the fashion industry, demonstrating a unique blend of creativity and commercial success. The Business Leader award acknowledges the work of a CEO or President of a fashion business who has successfully balanced creative talent and commercial growth, enabling both creative freedom and financial stability. The Urban Luxe Award celebrates contemporary apparel brands that have redefined the perception of sportswear and elevated casual fashion to high-end and directional levels.
                                Historical moments at the Fashion Awards include Princess Diana's attendance at the first ceremony in 1989, wearing a Catherine Walker gown specifically designed for the occasion. In 2010, four-time winner of the British Designer of the Year award, Alexander McQueen, received the award for Outstanding Achievement in Fashion Design, recognizing his illustrious career. In 2007, the Fashion Creator Award was renamed the Isabella Blow Award for Fashion Creator in honor of Isabella Blow, who was renowned for her unwavering support of British designers and her contribution to the international fashion scene.
                            </P>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bottom-8 left-4 right-4">
                <TouchableOpacity
                    className="bg-white rounded-full py-4"
                    onPress={() => { }}
                >
                    <Text className="text-black text-center font-semibold">
                        Book Experience
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
