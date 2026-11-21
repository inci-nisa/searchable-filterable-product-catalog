import React, {useState} from 'react';
import { View, Text, TextInput, FlatList, Pressable, Image, StyleSheet} from 'react-native';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
 const data: Product[]=[
  {id:1, name: 'Telefon', category:'Elektronik', price: 5000},
  {id:2, name: 'Kulaklık', category:'Elektronik', price: 500},
  {id:3, name: 'Klavye', category:'Elektronik', price: 600},
  {id:4, name:'Bilgisayar', category:'Elektronik', price:50000},
  {id:5, name: 'Mont', category:'Giyim', price: 2000},
  {id:6, name: 'Bot', category:'Giyim', price: 2500},
  {id:7, name: 'Araba', category:'Ulaşım', price: 1000000},
  {id:8, name: 'Motorsiklet', category:'Ulaşım', price: 500000},
  {id:9, name: 'Roman', category:'Kitap', price:100},
  {id:10, name: 'Şiir', category:'Kitap', price:150},
 ];
 const cats=['Tümü', 'Elektronik', 'Giyim', 'Ulaşım', 'Kitap'];

 const ProductCard = ({item}: {item:Product})=> (
  <View style= {s.kart}>
   <Text style ={s.kartAd}>{item.name}</Text>
   <Text style={s.kartBilgi}>{item.category}- {item.price} $</Text> 
  </View>
   );

   export default function App(){
    const [ara, setAra] = useState('');
    const [kat, setKat] = useState('Tümü');

    const filtreli= data.filter( x=>
    x.name.toLowerCase().includes(ara.toLowerCase()) &&
    (kat==='Tümü'|| x.category===kat)
    );

    return (
      <View style={s.kap}>

      <View style={s.ustAlan}>
       <Text style={s.selam}> Hos geldin!</Text>
       </Text>


     <TextInput
     style={s.girdi}
     placeholder="Ürün ara..."
     value={ara} 
     onChangeText={setAra}
     />

     {/*Kategoriler*/}
     <View style={s.satir}>
     {cats.map(c=> (
      <Pressable key={c} onPress={()=> setKat(c)} style={[s.dugme, kat=== c && s.dugmeAktif]}>
       <Text style={s.dugmeYazi}>{c}</Text>
      </Pressable> 
        ))}
        </View>

        <View style ={[s.satir, {justifyContent: 'space-between'}]}>
         <Text style={s.bilgi}>{filtreli.length} urun bulundu</Text>
         <Pressable onPress={()=> {setAra(''); setKat('Tümü');}}>
          <Text style={s.temizle}>Filtreleri Temizle</Text>
         </Pressable> 
        </View> 

        <FlatList
        data={filtreli}
        keyExtractor={i => i.id.toString()}
        renderItem={({item})=> <ProductCard item={item} />}
        ListEmptyComponent={<Text style={s.bilgi}>Urun bulunamadi.</Text>}
        />
        </View>
    );
   }

   const s = StyleSheet.create({
    kap:{flex:1, backgroundColor: '#E6E6FA', padding:15, paddingTop:40},
    satir: {flexDirection:'row', alignItems: 'center', marginBottom:10},
    ustAlan:{ marginBottom:20, marginTop:10},
    selam:{ fontSize:26, fontWeight:'bold', color:'#f75104'},
    girdi:{borderWidth:1, borderColor:'#8A2BE2', padding: 10, borderRadius:8, backgroundColor:'#fff', marginBottom:10},
    dugme:{backgroundColor:'#D8BFD8', padding:8, borderRadius:8,marginRight:5},
    dugmeAktif:{ backgroundColor:'#FF7F50'},
    dugmeYazi:{ color:'#fff', fontWeight:'bold'},
    bilgi:{ color:'#8A2BE2', fontWeight:'bold', textDecorationLine:'underline'},
    kart:{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:10, borderColor:'#D8BFD8', borderWidth:1},
    kartAd: {fontWeight: 'bold', fontSize:16, color:'#4B0082'},
    kartBilgi: {color:'#666', marginTop:4}
     });