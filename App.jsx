import { useState, useRef, useEffect, useCallback } from "react";

const C = {
  yellow:"#F8CE0B",yellowSoft:"#FFF9D6",yellowDim:"#F8CE0B22",
  green:"#0C831F",greenSoft:"#E8F5E9",greenDim:"#0C831F18",
  white:"#FFFFFF",bg:"#F2F2F7",border:"#EBEBEB",
  text:"#1C1C1E",textMid:"#555555",textMuted:"#999999",
  red:"#E53935",orange:"#FF6D00",orangeSoft:"#FFF3E0",
  purple:"#7C3AED",purpleSoft:"#F5F3FF",
  shadow:"0 2px 12px rgba(0,0,0,0.08)",
  shadowMd:"0 4px 24px rgba(0,0,0,0.12)",
  shadowLg:"0 8px 40px rgba(0,0,0,0.16)",
};
const FONT="'Nunito',system-ui,sans-serif";
const MONO="'JetBrains Mono',monospace";
const DEFAULT_ADDR="Govt. Polytechnic Patna-7, Gulzarbagh";

// ── IST Time Helper ──────────────────────────────────────────────
function getIST() {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
function getISTDate() {
  return new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const BANNERS=[
  {bg:"linear-gradient(135deg,#F8CE0B,#FFE566)",title:"Fastest Delivery",sub:"Groceries in 10 min",icon:"⚡"},
  {bg:"linear-gradient(135deg,#4CAF50,#81C784)",title:"Summer Specials",sub:"Beat the heat deals",icon:"☀️"},
  {bg:"linear-gradient(135deg,#FF6D00,#FFB74D)",title:"Daily Essentials",sub:"Never run out again",icon:"🛒"},
  {bg:"linear-gradient(135deg,#7C3AED,#A78BFA)",title:"Premium Gifting",sub:"Curated hampers & more",icon:"🎁"},
];

const CATS=[
  {id:"all",label:"All",icon:"🏠",bg:"#F8CE0B"},
  {id:"summer",label:"Summer",icon:"☀️",bg:"#FFF9C4"},
  {id:"electronics",label:"Electronics",icon:"⚡",bg:"#E8EAF6"},
  {id:"beauty",label:"Beauty",icon:"💄",bg:"#FCE4EC"},
  {id:"decor",label:"Decor",icon:"🕯️",bg:"#F3E5F5"},
  {id:"kids",label:"Kids",icon:"🧸",bg:"#FFF3E0"},
  {id:"gifting",label:"Gifting",icon:"🎁",bg:"#E8F5E9"},
  {id:"imported",label:"Imported",icon:"✈️",bg:"#E3F2FD"},
  {id:"dairy",label:"Dairy",icon:"🥛",bg:"#E3F2FD"},
  {id:"veggies",label:"Veggies",icon:"🥦",bg:"#E8F5E9"},
  {id:"fruits",label:"Fruits",icon:"🍎",bg:"#FFEBEE"},
  {id:"bakery",label:"Bakery",icon:"🍞",bg:"#FFF3E0"},
  {id:"pantry",label:"Pantry",icon:"🫙",bg:"#F3E5F5"},
  {id:"snacks",label:"Snacks",icon:"🍿",bg:"#FBE9E7"},
  {id:"beverages",label:"Drinks",icon:"🧃",bg:"#E8EAF6"},
  {id:"breakfast",label:"Breakfast",icon:"🌅",bg:"#FFF8E1"},
  {id:"household",label:"Household",icon:"🏡",bg:"#F1F8E9"},
];

const P=[
  {id:1,name:"Organic Whole Milk",brand:"Amul",price:68,mrp:80,unit:"1L",img:"🥛",cat:"dairy",freq:12,badge:"BESTSELLER",color:"#E3F2FD"},
  {id:2,name:"Free Range Eggs",brand:"Country Delight",price:89,mrp:99,unit:"12 pcs",img:"🥚",cat:"dairy",freq:10,badge:"FRESH",color:"#FFF8E1"},
  {id:3,name:"Sourdough Bread",brand:"Modern Bread",price:65,mrp:75,unit:"400g",img:"🍞",cat:"bakery",freq:8,badge:null,color:"#FFF3E0"},
  {id:4,name:"Greek Yogurt",brand:"Epigamia",price:55,mrp:60,unit:"200g",img:"🫙",cat:"dairy",freq:7,badge:"NEW",color:"#F3E5F5"},
  {id:5,name:"Cold Pressed Oil",brand:"Saffola Gold",price:182,mrp:220,unit:"1L",img:"🫒",cat:"pantry",freq:6,badge:null,color:"#F1F8E9"},
  {id:6,name:"Cherry Tomatoes",brand:"Farm Fresh",price:45,mrp:50,unit:"500g",img:"🍅",cat:"veggies",freq:9,badge:"FRESH",color:"#FFEBEE"},
  {id:7,name:"Baby Spinach",brand:"FarmFresh",price:35,mrp:40,unit:"200g",img:"🥬",cat:"veggies",freq:5,badge:null,color:"#E8F5E9"},
  {id:8,name:"Hass Avocados",brand:"Exotic Farms",price:120,mrp:140,unit:"2 pcs",img:"🥑",cat:"fruits",freq:4,badge:"IMPORTED",color:"#E8F5E9"},
  {id:9,name:"Blueberries",brand:"Driscoll's",price:199,mrp:250,unit:"125g",img:"🫐",cat:"fruits",freq:3,badge:"IMPORTED",color:"#EDE7F6"},
  {id:10,name:"Roasted Almonds",brand:"Happy Nuts",price:299,mrp:350,unit:"500g",img:"🌰",cat:"snacks",freq:6,badge:null,color:"#FFF8E1"},
  {id:11,name:"Dark Chocolate 70%",brand:"Amul",price:85,mrp:100,unit:"150g",img:"🍫",cat:"snacks",freq:5,badge:"NEW",color:"#EFEBE9"},
  {id:12,name:"Mineral Water 6pk",brand:"Bisleri",price:20,mrp:20,unit:"1L×6",img:"💧",cat:"beverages",freq:11,badge:"BESTSELLER",color:"#E3F2FD"},
  {id:13,name:"Green Tea",brand:"Tetley",price:145,mrp:175,unit:"25 bags",img:"🍵",cat:"beverages",freq:4,badge:null,color:"#E8F5E9"},
  {id:14,name:"Instant Oats",brand:"Quaker",price:99,mrp:115,unit:"800g",img:"🌾",cat:"breakfast",freq:7,badge:null,color:"#FFF3E0"},
  {id:15,name:"Peanut Butter",brand:"Skippy",price:249,mrp:299,unit:"462g",img:"🥜",cat:"pantry",freq:5,badge:null,color:"#FFF8E1"},
  {id:16,name:"Cheddar Cheese",brand:"Amul",price:130,mrp:150,unit:"200g",img:"🧀",cat:"dairy",freq:6,badge:null,color:"#FFF8E1"},
  {id:17,name:"Sunscreen SPF 50+",brand:"Lotus Herbals",price:299,mrp:350,unit:"100ml",img:"🧴",cat:"summer",freq:5,badge:"SUMMER",color:"#FFF9C4"},
  {id:18,name:"Cooling Face Mist",brand:"Plum",price:199,mrp:249,unit:"150ml",img:"💦",cat:"summer",freq:3,badge:"NEW",color:"#E3F2FD"},
  {id:19,name:"Watermelon",brand:"Farm Fresh",price:49,mrp:60,unit:"1 kg",img:"🍉",cat:"summer",freq:8,badge:"FRESH",color:"#FFEBEE"},
  {id:20,name:"Coconut Water",brand:"Raw Pressery",price:65,mrp:80,unit:"200ml×4",img:"🥥",cat:"summer",freq:6,badge:null,color:"#E8F5E9"},
  {id:21,name:"Summer Cap",brand:"Adidas",price:399,mrp:599,unit:"One Size",img:"🧢",cat:"summer",freq:2,badge:"NEW",color:"#FFF9C4"},
  {id:22,name:"Iced Tea Mix",brand:"Nestea",price:89,mrp:99,unit:"400g",img:"🫖",cat:"summer",freq:4,badge:null,color:"#E8F5E9"},
  {id:23,name:"USB-C Cable 2m",brand:"Anker",price:399,mrp:599,unit:"2 meters",img:"🔌",cat:"electronics",freq:4,badge:"BESTSELLER",color:"#E8EAF6"},
  {id:24,name:"Power Bank 10000mAh",brand:"Mi",price:999,mrp:1299,unit:"10000mAh",img:"🔋",cat:"electronics",freq:3,badge:null,color:"#E3F2FD"},
  {id:25,name:"Wireless Earbuds",brand:"boAt",price:1299,mrp:1999,unit:"True Wireless",img:"🎧",cat:"electronics",freq:2,badge:"NEW",color:"#EDE7F6"},
  {id:26,name:"LED Bulb 9W",brand:"Philips",price:89,mrp:120,unit:"Pack of 2",img:"💡",cat:"electronics",freq:5,badge:"BESTSELLER",color:"#FFF9C4"},
  {id:27,name:"Extension Board 6m",brand:"Havells",price:349,mrp:450,unit:"4 sockets",img:"🔌",cat:"electronics",freq:3,badge:null,color:"#E8EAF6"},
  {id:28,name:"Smart Plug WiFi",brand:"Wipro",price:549,mrp:699,unit:"WiFi",img:"⚡",cat:"electronics",freq:2,badge:"NEW",color:"#E8EAF6"},
  {id:29,name:"Gentle Face Wash",brand:"Cetaphil",price:249,mrp:299,unit:"150ml",img:"🧼",cat:"beauty",freq:6,badge:"BESTSELLER",color:"#FCE4EC"},
  {id:30,name:"Moisturizer SPF 30",brand:"Dot & Key",price:399,mrp:499,unit:"50ml",img:"🫧",cat:"beauty",freq:4,badge:"NEW",color:"#FCE4EC"},
  {id:31,name:"Lip Balm Pack",brand:"Nivea",price:99,mrp:120,unit:"3 pcs",img:"💋",cat:"beauty",freq:5,badge:null,color:"#FCE4EC"},
  {id:32,name:"Bringha Hair Oil",brand:"Indulekha",price:299,mrp:380,unit:"100ml",img:"💆",cat:"beauty",freq:4,badge:"BESTSELLER",color:"#FFF8E1"},
  {id:33,name:"Deep Moisture Lotion",brand:"Vaseline",price:199,mrp:249,unit:"400ml",img:"🧴",cat:"beauty",freq:5,badge:null,color:"#E3F2FD"},
  {id:34,name:"Dove Shampoo",brand:"Dove",price:299,mrp:350,unit:"650ml",img:"🚿",cat:"beauty",freq:4,badge:null,color:"#E3F2FD"},
  {id:35,name:"Lavender Candle",brand:"Iris",price:299,mrp:399,unit:"Single",img:"🕯️",cat:"decor",freq:3,badge:"NEW",color:"#F3E5F5"},
  {id:36,name:"Wooden Photo Frame",brand:"Ikea",price:199,mrp:299,unit:"6×8 inch",img:"🖼️",cat:"decor",freq:2,badge:null,color:"#FFF3E0"},
  {id:37,name:"Ceramic Plant Pot",brand:"Ugaoo",price:349,mrp:499,unit:"Medium",img:"🪴",cat:"decor",freq:2,badge:"BESTSELLER",color:"#E8F5E9"},
  {id:38,name:"Fairy String Lights",brand:"Philips",price:449,mrp:599,unit:"5m 20 LEDs",img:"✨",cat:"decor",freq:2,badge:null,color:"#FFF9C4"},
  {id:39,name:"Velvet Cushion Cover",brand:"H&M Home",price:299,mrp:399,unit:"16×16 inch",img:"🛋️",cat:"decor",freq:2,badge:"IMPORTED",color:"#EDE7F6"},
  {id:40,name:"Minimalist Wall Clock",brand:"Seiko",price:699,mrp:999,unit:"30cm dia",img:"🕐",cat:"decor",freq:1,badge:null,color:"#E3F2FD"},
  {id:41,name:"Crayons 64 Colors",brand:"Doms",price:149,mrp:199,unit:"64 shades",img:"🖍️",cat:"kids",freq:4,badge:"BESTSELLER",color:"#E8F5E9"},
  {id:42,name:"Building Blocks",brand:"Lego",price:999,mrp:1499,unit:"100 pcs",img:"🧱",cat:"kids",freq:2,badge:"IMPORTED",color:"#FFF3E0"},
  {id:43,name:"Bubble Wand Set",brand:"Fisher Price",price:199,mrp:299,unit:"3 wands",img:"🫧",cat:"kids",freq:3,badge:null,color:"#E3F2FD"},
  {id:44,name:"Play Dough Kit",brand:"Funskool",price:249,mrp:349,unit:"6 colors",img:"🎨",cat:"kids",freq:3,badge:"NEW",color:"#FCE4EC"},
  {id:45,name:"Sticker Book",brand:"Doms",price:99,mrp:150,unit:"500+ stickers",img:"⭐",cat:"kids",freq:3,badge:null,color:"#FFF9C4"},
  {id:46,name:"Fruit Snack Pouches",brand:"Soulfull",price:89,mrp:110,unit:"5 pouches",img:"🍓",cat:"kids",freq:5,badge:"FRESH",color:"#FFEBEE"},
  {id:47,name:"Premium Gift Hamper",brand:"OptimalMart",price:999,mrp:1499,unit:"Curated",img:"🎁",cat:"gifting",freq:2,badge:"BESTSELLER",color:"#FFF3E0"},
  {id:48,name:"Ferrero Rocher Box",brand:"Ferrero",price:699,mrp:899,unit:"16 pcs",img:"🍫",cat:"gifting",freq:3,badge:"IMPORTED",color:"#EFEBE9"},
  {id:49,name:"Dry Fruits Box",brand:"Happilo",price:599,mrp:799,unit:"500g mix",img:"🌰",cat:"gifting",freq:2,badge:null,color:"#FFF8E1"},
  {id:50,name:"Tea Gift Set",brand:"Teabox",price:499,mrp:699,unit:"8 varieties",img:"🍵",cat:"gifting",freq:2,badge:"NEW",color:"#E8F5E9"},
  {id:51,name:"Candle Gift Set",brand:"Iris",price:799,mrp:1099,unit:"3 candles",img:"🕯️",cat:"gifting",freq:1,badge:null,color:"#F3E5F5"},
  {id:52,name:"Greeting Cards",brand:"Hallmark",price:149,mrp:199,unit:"5 cards",img:"💌",cat:"gifting",freq:3,badge:null,color:"#FCE4EC"},
  {id:53,name:"Nutella Spread",brand:"Ferrero",price:399,mrp:499,unit:"350g",img:"🍫",cat:"imported",freq:5,badge:"IMPORTED",color:"#EFEBE9"},
  {id:54,name:"Pringles Original",brand:"Pringles",price:199,mrp:250,unit:"130g",img:"🍟",cat:"imported",freq:6,badge:"IMPORTED",color:"#FFF3E0"},
  {id:55,name:"Lindt 70% Dark",brand:"Lindt",price:349,mrp:450,unit:"100g",img:"🍫",cat:"imported",freq:4,badge:"IMPORTED",color:"#EFEBE9"},
  {id:56,name:"Kraft Mac & Cheese",brand:"Kraft",price:249,mrp:299,unit:"206g",img:"🧀",cat:"imported",freq:3,badge:"IMPORTED",color:"#FFF8E1"},
  {id:57,name:"Oreo Double Stuf",brand:"Nabisco",price:179,mrp:220,unit:"137g",img:"🍪",cat:"imported",freq:5,badge:"IMPORTED",color:"#E3F2FD"},
  {id:58,name:"Tropicana Orange",brand:"Tropicana",price:129,mrp:160,unit:"1L",img:"🍊",cat:"imported",freq:4,badge:"IMPORTED",color:"#FFF3E0"},
  {id:59,name:"Dish Wash Liquid",brand:"Vim",price:69,mrp:80,unit:"750ml",img:"🫧",cat:"household",freq:8,badge:"BESTSELLER",color:"#E8F5E9"},
  {id:60,name:"Laundry Detergent",brand:"Surf Excel",price:189,mrp:220,unit:"1kg",img:"👕",cat:"household",freq:7,badge:null,color:"#E3F2FD"},
  {id:61,name:"Toilet Paper 6 Roll",brand:"Kleenex",price:249,mrp:299,unit:"6 rolls",img:"🧻",cat:"household",freq:9,badge:"BESTSELLER",color:"#FFF3E0"},
  {id:62,name:"Floor Cleaner",brand:"Lizol",price:149,mrp:180,unit:"500ml",img:"🧹",cat:"household",freq:6,badge:null,color:"#E8F5E9"},
  {id:63,name:"Garbage Bags",brand:"Ezee",price:99,mrp:120,unit:"30 bags",img:"🗑️",cat:"household",freq:7,badge:null,color:"#F1F8E9"},
  {id:64,name:"Scrub Sponge Pack",brand:"Scotch-Brite",price:89,mrp:110,unit:"5 pcs",img:"🧽",cat:"household",freq:8,badge:"BESTSELLER",color:"#FFF9C4"},
];

const PAST_ORDERS=[
  {id:"ORD-4821",date:"Dec 28, 2024",time:"9:42 AM",total:456,status:"Delivered",
   items:[{...P[0],qty:2},{...P[1],qty:1},{...P[4],qty:1},{...P[11],qty:6}]},
  {id:"ORD-4756",date:"Dec 21, 2024",time:"7:15 PM",total:312,status:"Delivered",
   items:[{...P[0],qty:1},{...P[5],qty:2},{...P[6],qty:1},{...P[9],qty:1}]},
  {id:"ORD-4690",date:"Dec 14, 2024",time:"11:30 AM",total:789,status:"Delivered",
   items:[{...P[2],qty:2},{...P[3],qty:3},{...P[7],qty:2},{...P[8],qty:1}]},
];

const STEPS=[
  {label:"Confirmed",icon:"✓",done:true,active:false},
  {label:"Picking",icon:"📦",done:true,active:false},
  {label:"On the way",icon:"🛵",done:false,active:true},
  {label:"Delivered",icon:"🏠",done:false,active:false},
];

// ── Badge colors ───────────────────────────────────────────────────
const BADGE_COLOR={
  BESTSELLER:{bg:"#FFF3E0",c:"#E65100"},
  FRESH:{bg:"#E8F5E9",c:"#1B5E20"},
  NEW:{bg:"#E3F2FD",c:"#0D47A1"},
  IMPORTED:{bg:"#EDE7F6",c:"#4527A0"},
  SUMMER:{bg:"#FFF9C4",c:"#F57F17"},
};

export default function OptimalMart(){
  // ── IST clock ──
  const [istTime,setIstTime]=useState(getIST);
  const [istDate,setIstDate]=useState(getISTDate);

  useEffect(()=>{
    const tick=()=>{setIstTime(getIST());setIstDate(getISTDate());};
    const t=setInterval(tick,1000);
    return()=>clearInterval(t);
  },[]);

  // ── App state ──
  const [tab,setTab]=useState("home");
  const [cart,setCart]=useState({});
  const [search,setSearch]=useState("");
  const [selectedCat,setSelectedCat]=useState("all");
  const [expandedOrder,setExpandedOrder]=useState(null);
  const [showCart,setShowCart]=useState(false);
  const [showCheckout,setShowCheckout]=useState(false);
  const [payMethod,setPayMethod]=useState("upi");
  const [toast,setToast]=useState(null);
  const [flashId,setFlashId]=useState(null);
  const [bannerIdx,setBannerIdx]=useState(0);
  const [authScreen,setAuthScreen]=useState(null);
  const [authMode,setAuthMode]=useState("login");
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [authPhone,setAuthPhone]=useState("");
  const [authName,setAuthName]=useState("");
  const [otpVal,setOtpVal]=useState(["","","",""]);
  const [authLoad,setAuthLoad]=useState(false);
  const [locInput,setLocInput]=useState(DEFAULT_ADDR);
  const [detecting,setDetecting]=useState(false);
  const [showLocModal,setShowLocModal]=useState(false);
  const [placing,setPlacing]=useState(false);
  const toastTimer=useRef(null);
  const otpRefs=[useRef(),useRef(),useRef(),useRef()];

  useEffect(()=>{
    const t=setInterval(()=>setBannerIdx(i=>(i+1)%BANNERS.length),3500);
    return()=>clearInterval(t);
  },[]);

  const totalItems=Object.values(cart).reduce((s,q)=>s+q,0);
  const totalPrice=Object.entries(cart).reduce((s,[id,qty])=>{
    const p=P.find(x=>x.id===+id);return s+(p?p.price*qty:0);
  },0);
  const disc=p=>Math.round((1-p.price/p.mrp)*100);

  const showToast=msg=>{
    setToast(msg);
    if(toastTimer.current)clearTimeout(toastTimer.current);
    toastTimer.current=setTimeout(()=>setToast(null),2600);
  };
  const addToCart=(id,flash=true)=>{
    setCart(c=>({...c,[id]:(c[id]||0)+1}));
    if(flash){setFlashId(id);setTimeout(()=>setFlashId(null),380);}
  };
  const removeFromCart=id=>setCart(c=>{
    const n={...c};if(n[id]>1)n[id]--;else delete n[id];return n;
  });
  const reorderAll=order=>{
    const nc={...cart};order.items.forEach(i=>{nc[i.id]=(nc[i.id]||0)+i.qty;});
    setCart(nc);showToast(`${order.items.length} items added to cart 🛒`);
  };
  const handlePlaceOrder=()=>{
    setPlacing(true);
    setTimeout(()=>{setPlacing(false);setShowCheckout(false);setCart({});setTab("track");showToast("Order placed! Arriving in 9 min 🚀");},1400);
  };
  const handleSendOtp=()=>{
    if(authPhone.length<10)return;
    setAuthLoad(true);
    setTimeout(()=>{setAuthLoad(false);setAuthScreen("otp");},1200);
  };
  const handleVerifyOtp=()=>{
    if(otpVal.join("").length<4)return;
    setAuthLoad(true);
    setTimeout(()=>{
      setAuthLoad(false);setIsLoggedIn(true);setAuthScreen(null);
      showToast(`Welcome${authName?", "+authName:""}! 🎉`);
    },1000);
  };
  const handleOtpChange=(v,i)=>{
    const d=v.replace(/\D/,"");const n=[...otpVal];n[i]=d;setOtpVal(n);
    if(d&&i<3)otpRefs[i+1].current?.focus();
    if(!d&&i>0)otpRefs[i-1].current?.focus();
  };
  const openAuth=mode=>{setAuthMode(mode);setAuthScreen(mode);setOtpVal(["","","",""]);};
  const goBack=()=>{
    if(authScreen==="otp")setAuthScreen(authMode);
    else setAuthScreen(null);
  };
  const logout=()=>{setIsLoggedIn(false);setAuthPhone("");setAuthName("");setCart({});setTab("home");showToast("Logged out successfully");};

  const detectLiveLocation=()=>{
    setDetecting(true);
    if(!navigator.geolocation){showToast("Geolocation not supported");setDetecting(false);return;}
    navigator.geolocation.getCurrentPosition(
      async pos=>{
        try{
          const {latitude,longitude}=pos.coords;
          const res=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,{headers:{"Accept-Language":"en"}});
          const data=await res.json();
          const parts=[data.address?.road||data.address?.neighbourhood,data.address?.suburb||data.address?.city_district,data.address?.city||data.address?.town].filter(Boolean);
          setLocInput(parts.join(", ")||DEFAULT_ADDR);
        }catch{setLocInput(DEFAULT_ADDR);}
        setDetecting(false);
      },
      ()=>{setDetecting(false);showToast("Please allow location access 📍");},
      {timeout:10000,maximumAge:60000}
    );
  };

  const filtered=P.filter(p=>{
    const ms=p.name.toLowerCase().includes(search.toLowerCase())||p.brand.toLowerCase().includes(search.toLowerCase());
    const mc=selectedCat==="all"||p.cat===selectedCat;
    return ms&&mc;
  });
  const topSell=[...P].sort((a,b)=>b.freq-a.freq).slice(0,10);
  const snacksDrinks=P.filter(p=>p.cat==="snacks"||p.cat==="beverages");
  const householdItems=P.filter(p=>p.cat==="household");
  const buyAgain=[...P].sort((a,b)=>b.freq-a.freq).slice(0,8);
  const summerItems=P.filter(p=>p.cat==="summer");

  // ── Shared component: Product Card ────────────────────────────────
  const ProductCard=({p,horizontal=false})=>{
    const inCart=cart[p.id]||0;
    const isFlash=flashId===p.id;
    const bc=BADGE_COLOR[p.badge]||{bg:"#eee",c:"#333"};
    if(horizontal){
      return(
        <div style={{background:C.white,borderRadius:16,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:12,boxShadow:C.shadow,flexShrink:0}}>
          <div style={{width:56,height:56,borderRadius:12,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{p.img}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:800,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
            <div style={{fontSize:11,color:C.textMuted,fontWeight:600}}>{p.brand} · {p.unit}</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
              <span style={{fontSize:14,fontWeight:900,color:C.text}}>₹{p.price}</span>
              {p.mrp>p.price&&<span style={{fontSize:11,color:C.textMuted,textDecoration:"line-through"}}>₹{p.mrp}</span>}
              {p.mrp>p.price&&<span style={{fontSize:10,fontWeight:800,color:C.green}}>{disc(p)}% off</span>}
            </div>
          </div>
          {inCart===0?(
            <button onClick={()=>addToCart(p.id)} style={{width:36,height:36,borderRadius:10,background:C.green,border:"none",color:"#fff",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontWeight:800,transition:"transform .15s",transform:isFlash?"scale(1.25)":"scale(1)"}}>+</button>
          ):(
            <div style={{display:"flex",alignItems:"center",gap:6,background:C.greenSoft,borderRadius:10,padding:"4px 8px",flexShrink:0}}>
              <button onClick={()=>removeFromCart(p.id)} style={{width:24,height:24,borderRadius:7,background:C.green,border:"none",color:"#fff",fontSize:16,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{fontSize:14,fontWeight:900,color:C.green,minWidth:14,textAlign:"center"}}>{inCart}</span>
              <button onClick={()=>addToCart(p.id)} style={{width:24,height:24,borderRadius:7,background:C.green,border:"none",color:"#fff",fontSize:16,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          )}
        </div>
      );
    }
    return(
      <div style={{background:C.white,borderRadius:18,padding:12,width:148,flexShrink:0,boxShadow:C.shadow,position:"relative",overflow:"hidden"}}>
        {p.badge&&<div style={{position:"absolute",top:8,left:8,background:bc.bg,color:bc.c,fontSize:8,fontWeight:900,padding:"2px 6px",borderRadius:6,letterSpacing:.5,zIndex:2}}>{p.badge}</div>}
        <div style={{height:72,borderRadius:12,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,marginBottom:8}}>{p.img}</div>
        <div style={{fontSize:12,fontWeight:800,color:C.text,lineHeight:1.3,minHeight:30}}>{p.name}</div>
        <div style={{fontSize:10,color:C.textMuted,fontWeight:600,marginTop:2}}>{p.brand} · {p.unit}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
          <div>
            <span style={{fontSize:15,fontWeight:900,color:C.text}}>₹{p.price}</span>
            {p.mrp>p.price&&<div style={{fontSize:9,color:C.textMuted,textDecoration:"line-through"}}>₹{p.mrp}</div>}
          </div>
          {inCart===0?(
            <button onClick={()=>addToCart(p.id)} style={{width:32,height:32,borderRadius:10,background:C.green,border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,transition:"transform .15s",transform:isFlash?"scale(1.25)":"scale(1)"}}>+</button>
          ):(
            <div style={{display:"flex",alignItems:"center",gap:4,background:C.greenSoft,borderRadius:10,padding:"3px 6px"}}>
              <button onClick={()=>removeFromCart(p.id)} style={{width:20,height:20,borderRadius:6,background:C.green,border:"none",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{fontSize:12,fontWeight:900,color:C.green,minWidth:12,textAlign:"center"}}>{inCart}</span>
              <button onClick={()=>addToCart(p.id)} style={{width:20,height:20,borderRadius:6,background:C.green,border:"none",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Section Row ───────────────────────────────────────────────────
  const SectionRow=({title,emoji,items,onMore})=>(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:18}}>{emoji}</span>
          <span style={{fontSize:15,fontWeight:900,color:C.text}}>{title}</span>
        </div>
        {onMore&&<button onClick={onMore} style={{background:"none",border:"none",fontSize:12,fontWeight:800,color:C.green,cursor:"pointer"}}>See all →</button>}
      </div>
      <div style={{display:"flex",gap:10,paddingLeft:16,paddingRight:16,overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none"}}>
        {items.map(p=><ProductCard key={p.id} p={p}/>)}
      </div>
    </div>
  );

  // ── HOME TAB ──────────────────────────────────────────────────────
  const HomeTab=()=>(
    <div>
      {/* Header */}
      <div style={{background:C.white,padding:"12px 16px 10px",borderBottom:`1.5px solid ${C.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{fontSize:22,fontWeight:900,color:C.text,letterSpacing:-.5}}>Optimal<span style={{color:C.green}}>Mart</span></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{background:C.green,borderRadius:20,padding:"5px 11px",display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontSize:12}}>⚡</span>
              <span style={{fontSize:11,fontWeight:800,color:"#fff"}}>9 min</span>
            </div>
            <button onClick={()=>setShowCart(true)} style={{width:38,height:38,borderRadius:12,background:totalItems>0?C.yellow:C.bg,border:"none",cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
              🛒
              {totalItems>0&&<div style={{position:"absolute",top:-4,right:-4,background:C.green,borderRadius:10,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#fff",padding:"0 4px"}}>{totalItems}</div>}
            </button>
          </div>
        </div>
        {/* Location */}
        <button onClick={()=>setShowLocModal(true)} style={{display:"flex",alignItems:"center",gap:5,background:C.yellowSoft,border:`1.5px solid ${C.yellow}`,borderRadius:20,padding:"5px 10px",cursor:"pointer",maxWidth:"100%",width:"100%"}}>
          <span style={{fontSize:14}}>📍</span>
          <span style={{fontSize:11,fontWeight:800,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:1,textAlign:"left"}}>{locInput}</span>
          <span style={{fontSize:12,color:C.textMuted,flexShrink:0}}>▾</span>
        </button>
      </div>

      {/* Search bar */}
      <div style={{padding:"12px 16px",background:C.white,borderBottom:`1.5px solid ${C.border}`}}>
        <div onClick={()=>setTab("search")} style={{background:C.bg,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
          <span style={{fontSize:16}}>🔍</span>
          <span style={{fontSize:13,color:C.textMuted,fontWeight:600}}>Search groceries & more…</span>
        </div>
      </div>

      {/* Banner */}
      <div style={{margin:"14px 16px",borderRadius:20,overflow:"hidden",background:BANNERS[bannerIdx].bg,padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",minHeight:90,transition:"background .5s"}}>
        <div>
          <div style={{fontSize:19,fontWeight:900,color:C.text}}>{BANNERS[bannerIdx].title}</div>
          <div style={{fontSize:12,color:C.textMid,fontWeight:600,marginTop:3}}>{BANNERS[bannerIdx].sub}</div>
          <button style={{marginTop:10,background:C.green,border:"none",borderRadius:12,padding:"6px 14px",fontSize:12,fontWeight:800,color:"#fff",cursor:"pointer"}}>Order Now</button>
        </div>
        <div style={{fontSize:56}}>{BANNERS[bannerIdx].icon}</div>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:14}}>
        {BANNERS.map((_,i)=><div key={i} style={{width:i===bannerIdx?18:6,height:6,borderRadius:4,background:i===bannerIdx?C.green:C.border,transition:"all .3s"}}/>)}
      </div>

      {/* Categories */}
      <div style={{padding:"0 0 10px"}}>
        <div style={{paddingLeft:16,marginBottom:10,fontSize:15,fontWeight:900,color:C.text}}>Categories</div>
        <div style={{display:"flex",gap:8,paddingLeft:16,paddingRight:16,overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",paddingBottom:4}}>
          {CATS.map(cat=>(
            <button key={cat.id} onClick={()=>{setSelectedCat(cat.id);setTab("search");}} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:cat.bg,borderRadius:14,padding:"10px 12px",border:`2px solid ${selectedCat===cat.id?"#0C831F":cat.bg}`,cursor:"pointer",minWidth:64}}>
              <span style={{fontSize:22}}>{cat.icon}</span>
              <span style={{fontSize:10,fontWeight:800,color:C.text,whiteSpace:"nowrap"}}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <SectionRow title="Top Sellers" emoji="🔥" items={topSell}/>
      <SectionRow title="☀️ Summer Must-Haves" emoji="" items={summerItems}/>

      {/* AI reorder tips */}
      <div style={{margin:"0 16px 20px"}}>
        <div style={{fontSize:15,fontWeight:900,color:C.text,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
          <span>🤖</span> Smart Reorders
        </div>
        {[...P].sort((a,b)=>b.freq-a.freq).slice(0,3).map((p,i)=>{
          const tips=["You reorder every ~28 days. Running low?","Usually order on Mondays","Based on your usage pattern"];
          const days=[3,0,1];
          return(
            <div key={p.id} style={{background:C.white,borderRadius:16,padding:"10px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10,boxShadow:C.shadow}}>
              <div style={{fontSize:28,width:44,height:44,borderRadius:12,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{p.img}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:800,color:C.text}}>{p.name}</div>
                <div style={{fontSize:10,color:C.textMuted,fontWeight:600}}>{tips[i]}</div>
                <div style={{fontSize:10,fontWeight:800,color:days[i]===0?"#E53935":days[i]<=1?C.orange:C.green,marginTop:2}}>{days[i]===0?"⚠️ Order today!":days[i]===1?"⏰ Order tomorrow":` Reorder in ${days[i]} days`}</div>
              </div>
              <button onClick={()=>addToCart(p.id)} style={{background:C.green,border:"none",borderRadius:10,padding:"6px 10px",color:"#fff",fontSize:11,fontWeight:800,cursor:"pointer"}}>Add</button>
            </div>
          );
        })}
      </div>

      <SectionRow title="Snacks & Drinks" emoji="🍿" items={snacksDrinks}/>
      <SectionRow title="Household" emoji="🏡" items={householdItems}/>
      <div style={{height:20}}/>
    </div>
  );

  // ── SEARCH TAB ────────────────────────────────────────────────────
  const SearchTab=()=>(
    <div>
      <div style={{background:C.white,padding:"12px 16px",borderBottom:`1.5px solid ${C.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{background:C.bg,borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search groceries & more…"
            style={{flex:1,background:"none",border:"none",outline:"none",fontSize:13,fontWeight:600,color:C.text,fontFamily:FONT}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:C.textMuted}}>✕</button>}
        </div>
        {/* Cat chips */}
        <div style={{display:"flex",gap:6,marginTop:10,overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none"}}>
          {CATS.map(cat=>(
            <button key={cat.id} onClick={()=>setSelectedCat(cat.id)} style={{flexShrink:0,padding:"5px 12px",borderRadius:20,border:`1.5px solid ${selectedCat===cat.id?C.green:C.border}`,background:selectedCat===cat.id?C.greenSoft:C.white,fontSize:11,fontWeight:800,color:selectedCat===cat.id?C.green:C.textMid,cursor:"pointer"}}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"12px 16px"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.textMuted,marginBottom:10}}>{filtered.length} results {selectedCat!=="all"?`in ${CATS.find(c=>c.id===selectedCat)?.label}`:""}</div>
        {filtered.map(p=><ProductCard key={p.id} p={p} horizontal/>)}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:C.textMuted,fontSize:32}}>🙁<div style={{fontSize:14,fontWeight:700,marginTop:8}}>Nothing found</div></div>}
      </div>
    </div>
  );

  // ── ORDERS TAB ────────────────────────────────────────────────────
  const OrdersTab=()=>(
    <div>
      <div style={{background:C.white,padding:"16px 16px 12px",borderBottom:`1.5px solid ${C.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{fontSize:18,fontWeight:900,color:C.text}}>My Orders</div>
      </div>
      <div style={{padding:"12px 16px"}}>
        {PAST_ORDERS.map(order=>(
          <div key={order.id} style={{background:C.white,borderRadius:18,marginBottom:12,overflow:"hidden",boxShadow:C.shadow}}>
            <div onClick={()=>setExpandedOrder(expandedOrder===order.id?null:order.id)} style={{padding:"14px 16px",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:900,color:C.text}}>{order.id}</span>
                <span style={{fontSize:11,fontWeight:800,color:C.green,background:C.greenSoft,padding:"3px 8px",borderRadius:8}}>✓ {order.status}</span>
              </div>
              <div style={{fontSize:11,color:C.textMuted,fontWeight:600,marginBottom:6}}>{order.date} · {order.time}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:4}}>{order.items.slice(0,4).map(it=><span key={it.id} style={{fontSize:20}}>{it.img}</span>)}</div>
                <span style={{fontSize:14,fontWeight:900,color:C.text}}>₹{order.total}</span>
              </div>
            </div>
            {expandedOrder===order.id&&(
              <div style={{borderTop:`1px solid ${C.border}`,padding:"12px 16px"}}>
                {order.items.map(it=>(
                  <div key={it.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <span style={{fontSize:22}}>{it.img}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:800,color:C.text}}>{it.name}</div>
                      <div style={{fontSize:10,color:C.textMuted,fontWeight:600}}>Qty: {it.qty} · ₹{it.price} each</div>
                    </div>
                    <span style={{fontSize:12,fontWeight:900,color:C.text}}>₹{it.price*it.qty}</span>
                  </div>
                ))}
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
                  <button onClick={()=>reorderAll(order)} style={{flex:1,background:C.green,border:"none",borderRadius:12,padding:"10px 0",fontSize:13,fontWeight:800,color:"#fff",cursor:"pointer",marginRight:8}}>🔁 Reorder All</button>
                  <button onClick={()=>showToast("Invoice downloading… 📄")} style={{width:44,height:44,background:C.bg,border:"none",borderRadius:12,fontSize:18,cursor:"pointer"}}>📄</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ── TRACK TAB ─────────────────────────────────────────────────────
  const TrackTab=()=>(
    <div>
      <div style={{background:C.white,padding:"16px 16px 12px",borderBottom:`1.5px solid ${C.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{fontSize:18,fontWeight:900,color:C.text}}>Live Tracking</div>
        <div style={{fontSize:11,color:C.textMuted,fontWeight:600,marginTop:2}}>Order #ORD-4821</div>
      </div>
      <div style={{padding:"16px"}}>
        {/* ETA Card */}
        <div style={{background:`linear-gradient(135deg,${C.green},#1B8C30)`,borderRadius:20,padding:"20px",marginBottom:16,color:"#fff",textAlign:"center",boxShadow:C.shadowMd}}>
          <div style={{fontSize:13,fontWeight:700,opacity:.9}}>Estimated Arrival</div>
          <div style={{fontSize:40,fontWeight:900,margin:"8px 0"}}>9 min</div>
          <div style={{fontSize:12,opacity:.8}}>Your order is on the way!</div>
          <div style={{marginTop:12,fontSize:28}}>🛵</div>
        </div>

        {/* Steps */}
        <div style={{background:C.white,borderRadius:18,padding:"16px",boxShadow:C.shadow,marginBottom:16}}>
          {STEPS.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<STEPS.length-1?16:0}}>
              <div style={{width:36,height:36,borderRadius:12,background:s.done?C.green:s.active?C.yellow:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,boxShadow:s.active?`0 0 0 3px ${C.yellowDim||"#F8CE0B33"}`:undefined}}>
                {s.done?"✓":s.icon}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:s.done||s.active?C.text:C.textMuted}}>{s.label}</div>
                {s.active&&<div style={{fontSize:10,color:C.green,fontWeight:700}}>In progress…</div>}
              </div>
              {s.done&&<span style={{color:C.green,fontWeight:800,fontSize:12}}>✓</span>}
              {s.active&&<div style={{width:8,height:8,borderRadius:4,background:C.green,animation:"pulse 1s infinite"}}/>}
            </div>
          ))}
        </div>

        {/* Rider info */}
        <div style={{background:C.white,borderRadius:18,padding:"14px 16px",boxShadow:C.shadow,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:48,height:48,borderRadius:14,background:"#E8F5E9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🧑‍🦱</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:900,color:C.text}}>Ravi Kumar</div>
            <div style={{fontSize:11,color:C.textMuted,fontWeight:600}}>Your delivery partner</div>
            <div style={{display:"flex",gap:4,marginTop:3}}>{"⭐⭐⭐⭐⭐".split("").map((s,i)=><span key={i} style={{fontSize:10}}>{s}</span>)}</div>
          </div>
          <a href="tel:+919876543210" style={{width:40,height:40,background:C.green,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,textDecoration:"none"}}>📞</a>
        </div>
      </div>
    </div>
  );

  // ── PROFILE TAB ───────────────────────────────────────────────────
  const ProfileTab=()=>(
    <div>
      <div style={{background:C.white,padding:"16px 16px 12px",borderBottom:`1.5px solid ${C.border}`,position:"sticky",top:0,zIndex:10}}>
        <div style={{fontSize:18,fontWeight:900,color:C.text}}>Profile</div>
      </div>
      {isLoggedIn?(
        <div style={{padding:"16px"}}>
          <div style={{background:C.white,borderRadius:20,padding:"20px",boxShadow:C.shadow,marginBottom:16,textAlign:"center"}}>
            <div style={{width:72,height:72,borderRadius:24,background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px"}}>👤</div>
            <div style={{fontSize:18,fontWeight:900,color:C.text}}>{authName||"OptimalMart User"}</div>
            <div style={{fontSize:12,color:C.textMuted,fontWeight:600,marginTop:4}}>+91 {authPhone.slice(0,5)} {authPhone.slice(5)}</div>
            <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"center"}}>
              <div style={{background:C.greenSoft,borderRadius:12,padding:"8px 16px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:900,color:C.green}}>3</div>
                <div style={{fontSize:10,color:C.textMuted,fontWeight:700}}>Orders</div>
              </div>
              <div style={{background:"#FFF9D6",borderRadius:12,padding:"8px 16px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:900,color:"#B8860B"}}>₹120</div>
                <div style={{fontSize:10,color:C.textMuted,fontWeight:700}}>Saved</div>
              </div>
              <div style={{background:C.purpleSoft,borderRadius:12,padding:"8px 16px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:900,color:C.purple}}>Gold</div>
                <div style={{fontSize:10,color:C.textMuted,fontWeight:700}}>Status</div>
              </div>
            </div>
          </div>
          {[["📍","Saved Addresses","Patna, Bihar"],["🔔","Notifications","All enabled"],["💳","Payment Methods","UPI linked"],["🎁","Refer & Earn","Get ₹50 per referral"],["ℹ️","About OptimalMart","v2.4.1"]].map(([icon,title,sub])=>(
            <div key={title} style={{background:C.white,borderRadius:16,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,boxShadow:C.shadow,cursor:"pointer"}} onClick={()=>showToast(`Opening ${title}…`)}>
              <span style={{fontSize:20}}>{icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:C.text}}>{title}</div>
                <div style={{fontSize:11,color:C.textMuted,fontWeight:600}}>{sub}</div>
              </div>
              <span style={{color:C.textMuted,fontSize:14}}>›</span>
            </div>
          ))}
          <button onClick={logout} style={{width:"100%",marginTop:8,background:"#FFEBEE",border:"none",borderRadius:16,padding:"14px",fontSize:14,fontWeight:800,color:C.red,cursor:"pointer"}}>🚪 Log Out</button>
        </div>
      ):(
        <div style={{padding:"40px 24px",textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:16}}>🛒</div>
          <div style={{fontSize:20,fontWeight:900,color:C.text,marginBottom:8}}>Join OptimalMart</div>
          <div style={{fontSize:13,color:C.textMuted,fontWeight:600,marginBottom:28,lineHeight:1.6}}>Log in to track orders, save addresses, and unlock member deals</div>
          <button onClick={()=>openAuth("login")} style={{width:"100%",background:C.green,border:"none",borderRadius:16,padding:"14px",fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer",marginBottom:10}}>Log In</button>
          <button onClick={()=>openAuth("signup")} style={{width:"100%",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:16,padding:"14px",fontSize:15,fontWeight:800,color:C.text,cursor:"pointer"}}>Create Account</button>
        </div>
      )}
    </div>
  );

  // ── AUTH MODAL ────────────────────────────────────────────────────
  const AuthModal=()=>(
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{background:C.white,borderRadius:"28px 28px 0 0",padding:"24px 20px 36px",boxShadow:C.shadowLg}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          {authScreen==="otp"&&<button onClick={goBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>←</button>}
          <div style={{fontSize:18,fontWeight:900,color:C.text,flex:1}}>{authScreen==="otp"?"Verify OTP":authScreen==="signup"?"Create Account":"Welcome Back"}</div>
          <button onClick={()=>setAuthScreen(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.textMuted}}>✕</button>
        </div>
        {authScreen==="otp"?(
          <>
            <div style={{fontSize:13,color:C.textMuted,fontWeight:600,marginBottom:20}}>OTP sent to +91 {authPhone}</div>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:24}}>
              {otpVal.map((v,i)=>(
                <input key={i} ref={otpRefs[i]} value={v} onChange={e=>handleOtpChange(e.target.value,i)} maxLength={1}
                  style={{width:56,height:56,borderRadius:14,border:`2px solid ${v?C.green:C.border}`,textAlign:"center",fontSize:22,fontWeight:900,color:C.text,background:v?C.greenSoft:C.white,outline:"none",fontFamily:MONO}}/>
              ))}
            </div>
            <button onClick={handleVerifyOtp} disabled={authLoad||otpVal.join("").length<4}
              style={{width:"100%",background:authLoad||otpVal.join("").length<4?"#ccc":C.green,border:"none",borderRadius:16,padding:"14px",fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer"}}>
              {authLoad?"Verifying…":"Verify & Continue"}
            </button>
          </>
        ):(
          <>
            {authScreen==="signup"&&(
              <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Your Name"
                style={{width:"100%",padding:"13px 14px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:14,fontWeight:700,color:C.text,background:C.bg,outline:"none",marginBottom:10,fontFamily:FONT}}/>
            )}
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <div style={{background:C.bg,borderRadius:14,padding:"13px 12px",fontWeight:800,fontSize:14,color:C.text,flexShrink:0}}>🇮🇳 +91</div>
              <input value={authPhone} onChange={e=>setAuthPhone(e.target.value.replace(/\D/,"").slice(0,10))} placeholder="Mobile number" type="tel"
                style={{flex:1,padding:"13px 14px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:14,fontWeight:700,color:C.text,background:C.bg,outline:"none",fontFamily:FONT}}/>
            </div>
            <button onClick={handleSendOtp} disabled={authLoad||authPhone.length<10}
              style={{width:"100%",background:authLoad||authPhone.length<10?"#ccc":C.green,border:"none",borderRadius:16,padding:"14px",fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer",marginBottom:14}}>
              {authLoad?"Sending OTP…":"Send OTP"}
            </button>
            <div style={{textAlign:"center",fontSize:12,color:C.textMuted,fontWeight:600}}>
              {authScreen==="login"?"New here? ":"Already have an account? "}
              <button onClick={()=>openAuth(authScreen==="login"?"signup":"login")} style={{background:"none",border:"none",color:C.green,fontWeight:800,fontSize:12,cursor:"pointer"}}>
                {authScreen==="login"?"Create Account":"Log In"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ── CART DRAWER ───────────────────────────────────────────────────
  const CartDrawer=()=>{
    const cartItems=Object.entries(cart).map(([id,qty])=>({...P.find(p=>p.id===+id),qty})).filter(Boolean);
    return(
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",zIndex:90,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
        <div style={{background:C.white,borderRadius:"28px 28px 0 0",maxHeight:"75%",display:"flex",flexDirection:"column",boxShadow:C.shadowLg}}>
          <div style={{padding:"16px 20px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:16,fontWeight:900,color:C.text}}>Cart · {totalItems} items</div>
            <button onClick={()=>setShowCart(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.textMuted}}>✕</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
            {cartItems.length===0?
              <div style={{textAlign:"center",padding:"30px 0",color:C.textMuted}}>
                <div style={{fontSize:40,marginBottom:8}}>🛒</div>
                <div style={{fontWeight:700}}>Cart is empty</div>
              </div>:
              cartItems.map(it=>(
                <div key={it.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:48,height:48,borderRadius:12,background:it.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{it.img}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:800,color:C.text}}>{it.name}</div>
                    <div style={{fontSize:11,color:C.textMuted,fontWeight:600}}>₹{it.price} × {it.qty}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,background:C.greenSoft,borderRadius:10,padding:"4px 8px"}}>
                    <button onClick={()=>removeFromCart(it.id)} style={{width:22,height:22,borderRadius:7,background:C.green,border:"none",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:13,fontWeight:900,color:C.green,minWidth:14,textAlign:"center"}}>{it.qty}</span>
                    <button onClick={()=>addToCart(it.id,false)} style={{width:22,height:22,borderRadius:7,background:C.green,border:"none",color:"#fff",fontSize:14,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <div style={{fontSize:13,fontWeight:900,color:C.text,minWidth:44,textAlign:"right"}}>₹{it.price*it.qty}</div>
                </div>
              ))
            }
          </div>
          {cartItems.length>0&&(
            <div style={{padding:"14px 16px 20px",borderTop:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontSize:13,color:C.textMuted,fontWeight:700}}>Subtotal</span>
                <span style={{fontSize:14,fontWeight:900,color:C.text}}>₹{totalPrice}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                <span style={{fontSize:13,color:C.textMuted,fontWeight:700}}>Delivery</span>
                <span style={{fontSize:13,fontWeight:800,color:C.green}}>FREE</span>
              </div>
              <button onClick={()=>{setShowCart(false);setShowCheckout(true);}} style={{width:"100%",background:C.green,border:"none",borderRadius:16,padding:"14px",fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span>Checkout</span><span style={{fontSize:12,opacity:.8}}>₹{totalPrice}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── CHECKOUT ──────────────────────────────────────────────────────
  const CheckoutScreen=()=>(
    <div style={{position:"absolute",inset:0,background:C.bg,zIndex:80,display:"flex",flexDirection:"column"}}>
      {/* Notch clone */}
      <div style={{height:44,background:C.white,display:"flex",alignItems:"center",padding:"0 20px",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`}}>
        <button onClick={()=>setShowCheckout(false)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer"}}>←</button>
        <span style={{fontSize:16,fontWeight:900,color:C.text}}>Checkout</span>
        <div/>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        {/* Deliver to */}
        <div style={{background:C.white,borderRadius:18,padding:"14px 16px",marginBottom:12,boxShadow:C.shadow}}>
          <div style={{fontSize:12,fontWeight:800,color:C.textMuted,marginBottom:6}}>DELIVERING TO</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>📍</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:800,color:C.text}}>{locInput}</div>
              <div style={{fontSize:11,color:C.textMuted,fontWeight:600}}>Estimated: 9 min</div>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div style={{background:C.white,borderRadius:18,padding:"14px 16px",marginBottom:12,boxShadow:C.shadow}}>
          <div style={{fontSize:12,fontWeight:800,color:C.textMuted,marginBottom:10}}>PAYMENT METHOD</div>
          {[["upi","📱 UPI / QR"],["card","💳 Credit / Debit Card"],["cod","💵 Cash on Delivery"]].map(([k,label])=>(
            <div key={k} onClick={()=>setPayMethod(k)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
              <div style={{width:20,height:20,borderRadius:10,border:`2px solid ${payMethod===k?C.green:C.border}`,background:payMethod===k?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {payMethod===k&&<div style={{width:8,height:8,borderRadius:4,background:"#fff"}}/>}
              </div>
              <span style={{fontSize:13,fontWeight:700,color:C.text}}>{label}</span>
            </div>
          ))}
        </div>
        {/* Bill */}
        <div style={{background:C.white,borderRadius:18,padding:"14px 16px",boxShadow:C.shadow}}>
          <div style={{fontSize:12,fontWeight:800,color:C.textMuted,marginBottom:10}}>BILL SUMMARY</div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:C.textMid,fontWeight:600}}>Item Total</span><span style={{fontSize:13,fontWeight:800,color:C.text}}>₹{totalPrice}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:C.textMid,fontWeight:600}}>Delivery Fee</span><span style={{fontSize:13,fontWeight:800,color:C.green}}>FREE</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:C.textMid,fontWeight:600}}>Taxes & Fees</span><span style={{fontSize:13,fontWeight:800,color:C.text}}>₹{Math.round(totalPrice*0.05)}</span></div>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:4,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:14,fontWeight:900,color:C.text}}>Grand Total</span><span style={{fontSize:15,fontWeight:900,color:C.green}}>₹{totalPrice+Math.round(totalPrice*0.05)}</span></div>
        </div>
      </div>
      <div style={{padding:"14px 16px 24px",background:C.white,borderTop:`1px solid ${C.border}`}}>
        <button onClick={handlePlaceOrder} disabled={placing} style={{width:"100%",background:placing?"#ccc":C.green,border:"none",borderRadius:16,padding:"16px",fontSize:16,fontWeight:900,color:"#fff",cursor:"pointer"}}>
          {placing?"Placing Order…":"🚀 Place Order"}
        </button>
      </div>
    </div>
  );

  // ── LOCATION MODAL ────────────────────────────────────────────────
  const LocModal=()=>(
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",zIndex:95,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{background:C.white,borderRadius:"28px 28px 0 0",padding:"24px 20px 36px",boxShadow:C.shadowLg}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:900,color:C.text}}>Delivery Location</div>
          <button onClick={()=>setShowLocModal(false)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.textMuted}}>✕</button>
        </div>
        <button onClick={detectLiveLocation} disabled={detecting} style={{width:"100%",background:C.yellowSoft,border:`1.5px solid ${C.yellow}`,borderRadius:14,padding:"13px",fontSize:14,fontWeight:800,color:C.text,cursor:"pointer",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:18}}>📍</span>{detecting?"Detecting…":"Use My Live Location"}
        </button>
        <textarea value={locInput} onChange={e=>setLocInput(e.target.value)} rows={3}
          style={{width:"100%",padding:"12px 14px",borderRadius:14,border:`1.5px solid ${C.border}`,fontSize:13,fontWeight:700,color:C.text,background:C.bg,outline:"none",resize:"none",fontFamily:FONT,marginBottom:14}}/>
        <button onClick={()=>setShowLocModal(false)} style={{width:"100%",background:C.green,border:"none",borderRadius:16,padding:"14px",fontSize:15,fontWeight:800,color:"#fff",cursor:"pointer"}}>Confirm Location</button>
      </div>
    </div>
  );

  // ── BOTTOM NAV ────────────────────────────────────────────────────
  const NAV_ITEMS=[
    {id:"home",icon:"🏠",label:"Home"},
    {id:"search",icon:"🔍",label:"Search"},
    {id:"orders",icon:"📦",label:"Orders"},
    {id:"track",icon:"🛵",label:"Track"},
    {id:"profile",icon:"👤",label:"Profile"},
  ];

  // ── RENDER ────────────────────────────────────────────────────────
  return(
    <div style={{fontFamily:FONT,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",padding:"20px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
        ::-webkit-scrollbar{display:none;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.85);}}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0;}to{transform:translateY(0);opacity:1;}}
        @keyframes toastIn{from{transform:translateX(-50%) translateY(20px);opacity:0;}to{transform:translateX(-50%) translateY(0);opacity:1;}}
      `}</style>

      {/* Toast */}
      {toast&&(
        <div style={{position:"fixed",bottom:110,left:"50%",transform:"translateX(-50%)",background:"#1C1C1E",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:13,fontWeight:800,zIndex:999,whiteSpace:"nowrap",animation:"toastIn .25s ease",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
          {toast}
        </div>
      )}

      {/* Phone Shell */}
      <div style={{width:390,height:844,background:C.bg,borderRadius:48,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative",boxShadow:`0 0 0 10px #1a1a1a,0 0 0 12px #2e2e2e,0 24px 80px rgba(0,0,0,.5)`}}>

        {/* ── NOTCH with REAL IST TIME ── */}
        <div style={{height:44,background:C.white,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
          {/* IST Clock — live, updates every second */}
          <div style={{fontFamily:MONO,fontSize:14,fontWeight:700,color:C.text,letterSpacing:.5}}>{istTime}</div>
          {/* Status icons */}
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:10,fontWeight:800,color:C.textMid,fontFamily:MONO}}>IST</span>
            <span style={{fontSize:11,fontWeight:700,color:C.textMid}}>●●●</span>
            <span style={{fontSize:11,fontWeight:800,color:C.textMid}}>5G</span>
            <span style={{fontSize:11,fontWeight:800,color:C.green}}>⬛ 100%</span>
          </div>
        </div>

        {/* Overlays */}
        {authScreen&&<AuthModal/>}
        {showLocModal&&<LocModal/>}
        {showCart&&<CartDrawer/>}
        {showCheckout&&<CheckoutScreen/>}

        {/* Screen */}
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden",background:C.bg}}>
          {tab==="home"&&<HomeTab/>}
          {tab==="search"&&<SearchTab/>}
          {tab==="orders"&&<OrdersTab/>}
          {tab==="track"&&<TrackTab/>}
          {tab==="profile"&&<ProfileTab/>}
        </div>

        {/* Bottom Nav */}
        <div style={{height:80,background:C.white,borderTop:`1.5px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-around",paddingBottom:12,flexShrink:0,boxShadow:"0 -4px 20px rgba(0,0,0,.06)"}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"8px 16px",borderRadius:16,color:tab===n.id?C.green:C.textMuted,transition:"all .18s",minWidth:58,position:"relative"}}>
              <span style={{fontSize:22,transition:"transform .2s",transform:tab===n.id?"scale(1.12)":"scale(1)"}}>{n.icon}</span>
              <span style={{fontSize:10,fontWeight:800,letterSpacing:.3,textTransform:"uppercase"}}>{n.label}</span>
              {n.id==="orders"&&totalItems>0&&<div style={{position:"absolute",top:6,right:12,width:7,height:7,borderRadius:4,background:C.yellow}}/>}
              {tab===n.id&&<div style={{width:5,height:5,borderRadius:3,background:C.yellow,marginTop:1}}/>}
            </button>
          ))}
        </div>
      </div>

      {/* IST date label below phone */}
      <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",fontSize:12,fontFamily:MONO,color:"rgba(255,255,255,0.5)",fontWeight:600,letterSpacing:1}}>
        {istDate} · IST (UTC+5:30)
      </div>
    </div>
  );
}
