import React, { useState, useMemo } from 'react';
import './index.css';
import './App.css';

const UniverseCard = ({ img, category, name, isBig = false }) => (
  <div style={{ 
    background: '#010a13', 
    border: '1px solid #1a2328', 
    cursor: 'pointer',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} />
    </div>
    <div style={{ padding: isBig ? '30px' : '20px', textAlign: 'center', background: '#010a13' }}>
      <div style={{ color: '#d0a85c', fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>◈</div>
      <p style={{ color: '#a0a0a0', fontSize: isBig ? '12px' : '10px', margin: '0 0 5px 0', textTransform: 'uppercase' }}>{category}</p>
      <h4 style={{ color: '#fff', fontSize: isBig ? '20px' : '14px', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>{name}</h4>
    </div>
  </div>
);
function App() {    
const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State để đóng mở video
  const [videoOpen, setVideoOpen] = useState(false);

  // Link video YouTube (ông có thể thay mã ID sau /embed/ bằng video của ông)
// THAY DÒNG NÀY (Nằm ở trên đầu hàm App)
const youtubeLink = "https://www.youtube.com/embed/XDr_7cH5JpU?autoplay=1&mute=1";
  const [selectedArticle, setSelectedArticle] = useState(null); 
  
  // Thêm state này vào đầu function App
const [selectedChampion, setSelectedChampion] = useState(null);
// Và thêm dòng này ngay dưới
const [selectedNews, setSelectedNews] = useState(null);
// Hàm xử lý khi bấm vào thẻ tướng
const handleChampionClick = (champ) => {
  setSelectedChampion(champ);
  window.scrollTo(0, 0); // Cuộn lên đầu trang để xem thông tin
}; 
const [activeSkill, setActiveSkill] = useState(0); // Mặc định là kỹ năng đầu tiên
  const [showChampionsPage, setShowChampionsPage] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNewsPage, setShowNewsPage] = useState(false);  
  const [showSupportPage, setShowSupportPage] = useState(false); 
  const [visibleCount, setVisibleCount] = useState(12);
  const [newsTitle, setNewsTitle] = useState("TIN TỨC");
  
  // State bổ sung cho tính năng tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // Danh sách đầy đủ 172 tướng
  const championNames = [
    "AATROX", "AHRI", "AKALI", "AKSHAN", "ALISTAR", "AMBESSA", "AMUMU", "ANIVIA", "ANNIE", "APHELIOS",
    "ASHE", "AURELION SOL", "AZIR", "BARD", "BEL'VETH", "BLITZCRANK", "BRAND", "BRAUM", "BRIAR", "CAITLYN",
    "CAMILLE", "CASSIOPEIA", "CHO'GATH", "CORKI", "DARIUS", "DIANA", "DR. MUNDO", "DRAVEN", "EKKO", "ELISE",
    "EVELYNN", "EZREAL", "FIDDLESTICKS", "FIORA", "FIZZ", "GALIO", "GANGPLANK", "GAREN", "GNAR", "GRAGAS",
    "GRAVES", "GWEN", "HECARIM", "HEIMERDINGER", "HWEI", "ILLAOI", "IRELIA", "IVERN", "JANNA", "JARVAN IV",
    "JAX", "JAYCE", "JHIN", "JINX", "K'SANTE", "KAI'SA", "KALISTA", "KARMA", "KARTHUS", "KASSADIN",
    "KATARINA", "KAYLE", "KAYN", "KENNEN", "KHA'ZIX", "KINDRED", "KLED", "KOG'MAW", "LEBLANC", "LEE SIN",
    "LEONA", "LILLIA", "LISSANDRA", "LUCIAN", "LULU", "LUX", "MALPHITE", "MALZAHAR", "MAOKAI", "MASTER YE",
    "MEL", "MILIO", "MISS FORTUNE", "MORDEKAISER", "MORGANA", "NAAFIRI", "NAMI", "NASUS", "NAUTILUS", "NEEKO",
    "NIDALEE", "NILAH", "NOCTURNE", "NUNU & WILLUMP", "OLAF", "ORIANNA", "ORNN", "PANTHEON", "POPPY", "PYKE",
    "QIYANA", "QUINN", "RAKAN", "RAMMUS", "REK'SAI", "RELL", "RENATA GLASC", "RENEKTON", "RENGAR", "RIVEN",
    "RUMBLE", "RYZE", "SAMIRA", "SEJUANI", "SENNA", "SERAPHINE", "SETT", "SHACO", "SHEN", "SHYVANA",
    "SINGED", "SION", "SIVIR", "SKARNER", "SMOLDER", "SONA", "SORAKA", "SWAIN", "SYLAS", "SYNDRA",
    "TAHM KENCH", "TALIYAH", "TALON", "TARIC", "TEEMO", "THRESH", "TRISTANA", "TRUNDLE", "TRYNDAMERE", "TWISTED FATE",
    "TWITCH", "UDYR", "URGOT", "VARUS", "VAYNE", "VEIGAR", "VEL'KOZ", "VEX", "VI", "VIEGO",
    "VIKTOR", "VLADIMIR", "VOLIBEAR", "WARWICK", "WUKONG", "XAYAH", "XERATH", "XIN ZHAO", "YASUO", "YONE",
    "YORICK", "YUUMI", "ZAC", "ZED", "ZERI", "ZIGGS", "ZILEAN", "ZOE", "ZYRA"
  ];

  const championsList = useMemo(() => {
    return Array.from({ length: 172 }, (_, i) => {
      const fileNumber = i + 20; 
      return {
        id: i,
        name: championNames[i] || `CHAMPION ${fileNumber}`, 
        img: `/${fileNumber}.png`
      };
    });
  }, []);

  // Logic lọc tướng khi tìm kiếm
  const filteredChampions = championsList.filter(champ => 
    champ.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openExternalEsports = () => {
    window.open("https://lolesports.com/vi-VN/", "_blank");
  };

  const resetHome = () => {
    setShowNewsPage(false);
    setShowChampionsPage(false);
    setShowSupportPage(false); 
    setSelectedArticle(null);
    setSearchQuery("");
    window.scrollTo(0, 0);
  };

  return ( 
 
    <div className="app-container"> 
    {videoOpen && (
  <div 
    onClick={() => setVideoOpen(false)} // Bấm ra vùng đen là đóng luôn cho tiện
    style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      background: 'rgba(0,0,0,0.9)', 
      display: 'flex', 
      zIndex: 10000 // Để số lớn cho chắc chắn nó đè lên tất cả
    }}
  >
    {/* Nút đóng X */}
    <button 
      onClick={() => setVideoOpen(false)} 
      style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        color: 'white',
        background: 'none',
        border: 'none',
        fontSize: '30px',
        cursor: 'pointer',
        zIndex: 10001
      }}
    >
      ×
    </button>
    
    {/* Khung Video */}
    <iframe 
      style={{ 
        margin: 'auto', 
        width: '90%',     // Trên điện thoại để 90% cho to
        maxWidth: '800px', // Trên laptop không bị quá to
        height: '50%', 
        border: 'none',
        borderRadius: '8px'
      }}
      src={youtubeLink}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)}
    <nav className="lol-navbar">
  <div className="nav-left">
    <img
      src="/anhriot.png"
      alt="Riot"
      className="nav-img-riot"
      style={{ cursor: 'pointer' }}
      onClick={resetHome}
    />
    <div className="divider"></div>
    <img
      src="/anhl.png"
      alt="LoL"
      className="nav-img-l"
      style={{ cursor: 'pointer' }}
      onClick={resetHome}
    />

    <ul className="nav-links">
      <li onClick={resetHome}>TRÒ CHƠI</li>

      <li onClick={() => {
        setShowNewsPage(false);
        setShowChampionsPage(true);
        setShowSupportPage(false);
      }}>
        TƯỚNG
      </li>

      {/* --- TIN TỨC (GIỮ NGUYÊN) --- */}
      <li className="nav-item-dropdown">
        <span>TIN TỨC ▼</span>
        <ul className="dropdown-menu">
          <li onClick={() => { setNewsTitle("TIN TỨC"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>TẤT CẢ</li>
          <li onClick={() => { setNewsTitle("TRÒ CHƠI"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>CẬP NHẬT TRÒ CHƠI</li>
          <li onClick={() => { setNewsTitle("ESPORTS"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>ESPORTS</li>
          <li onClick={() => { setNewsTitle("ĐỘI NGŨ PHÁT TRIỂN"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>ĐỘI NGŨ PHÁT TRIỂN</li>
          <li onClick={() => { setNewsTitle("TRUYỀN THÔNG"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>TRUYỀN THÔNG</li>
          <li onClick={() => { setNewsTitle("CỘNG ĐỒNG"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>CỘNG ĐỒNG</li>
          <li onClick={() => { setNewsTitle("RIOT GAMES"); setShowNewsPage(true); setShowChampionsPage(false); setShowSupportPage(false); }}>RIOT GAMES</li>
        </ul>
      </li>

      <li onClick={() => { 
        setNewsTitle("CHI TIẾT CẬP NHẬT"); 
        setShowNewsPage(true); 
        setShowChampionsPage(false); 
        setShowSupportPage(false);
      }}>
        CHI TIẾT CẬP NHẬT
      </li>

      <li onClick={openExternalEsports}>
        ESPORTS ↗
      </li>

      
      <li onClick={() => {
        setShowSupportPage(true);
        setShowNewsPage(false);
        setShowChampionsPage(false);
      }}>
        HỖ TRỢ ↗
      </li>
 

    </ul>
  </div>
      

     
  <div className="nav-right">
    <div className="nav-icons-container">
      {/* 🔥 MENU 3 GẠCH (GIỐNG TIN TỨC) */}
      <li className="nav-item-dropdown">
        <span className="hamburger-menu">☰</span>

        <ul className="dropdown-menu">
          <li onClick={resetHome}>TẤT CẢ</li>

          <li onClick={() => {
            setShowChampionsPage(true);
            setShowNewsPage(false);
            setShowSupportPage(false);
          }}>
            CẬP NHẬT TRÒ CHƠI
          </li>

          <li onClick={() => {
            setNewsTitle("TIN TỨC");
            setShowNewsPage(true);
            setShowChampionsPage(false);
            setShowSupportPage(false);
          }}>
            ESPORTS
          </li>

          <li onClick={() => {
            setNewsTitle("CẬP NHẬT TRÒ CHƠI");
            setShowNewsPage(true);
            setShowChampionsPage(false);
            setShowSupportPage(false);
          }}>
            ĐỘI NGŨ PHÁT TRIỂN 
          </li>

          <li onClick={() => {
            setNewsTitle("ESPORTS");
            setShowNewsPage(true);
            setShowChampionsPage(false);
            setShowSupportPage(false);
          }}>
            TRUYỀN THÔNG
          </li>

          <li onClick={() => {
            setShowSupportPage(true);
            setShowNewsPage(false);
            setShowChampionsPage(false);
          }}>
            RIOT
          </li>
        </ul>
      </li>

    
      <div className={`riot-search-container ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-icon-box" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <img src="/kinh.png" alt="Search" className="icon-search-img" />
        </div>
        <input 
          type="text" 
          className="riot-search-input" 
          placeholder="TÌM KIẾM" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <span className="icon-globe">🌐</span> 

    </div>

    <button className="btn-play-now">CHƠI NGAY</button>
  </div>
</nav>
      {/* --- PHẦN ĐIỀU HƯỚNG NỘI DUNG --- */}
      {showSupportPage ? (
        <div className="support-page" style={{ paddingTop: '80px', background: '#fff' }}>
          {/* Header Black Section */}
          <div style={{ background: '#000', padding: '80px 10% 60px', position: 'relative', overflow: 'hidden' }}>
            <h1 style={{ color: '#fff', fontSize: '50px', fontWeight: 'bold', marginBottom: '30px' }}>Hỗ Trợ Riot</h1>
            <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '600px', position: 'relative', zIndex: 2 }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Đăng nhập vào tài khoản Riot của bạn</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Xem yêu cầu của bạn, quản lý tài khoản của bạn và tìm sự hỗ trợ một cách nhanh chóng.</div>
              </div>
              <button style={{ background: '#d13639', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>ĐĂNG NHẬP</button>
            </div>
            <img src="/support.png" alt="Support" style={{ position: 'absolute', right: '0', bottom: '0', height: '100%', zIndex: 1 }} />
          </div>

          {/* White Cards Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '40px 10%', background: '#fff' }}>
            {[
              "Liên Minh Huyền Thoại – Metagame Demacia Trỗi Dậy",
              "Câu Hỏi Thường Gặp Về Riftbound",
              "Liên Minh Huyền Thoại – Chế Độ ARAM: Hỗn Loạn",
              "Mã Lỗi Vanguard"
            ].map((text, idx) => (
              <div key={idx} className="support-card-item" style={{ display: 'flex', alignItems: 'center', background: '#f8f8f8', padding: '20px', borderRadius: '4px', border: '1px solid #eee', cursor: 'pointer' }}>
                <div style={{ width: '4px', height: '100%', minHeight: '40px', background: '#d13639', marginRight: '15px' }}></div>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#000' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Công Cụ Hỗ Trợ Section */}
          <div style={{ background: '#000', padding: '60px 10%', color: '#fff', backgroundImage: 'url("/bg-support.png")', backgroundSize: 'cover' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>Công Cụ Hỗ Trợ</h2>
            <p style={{ color: '#888', marginBottom: '40px', fontSize: '14px' }}>Danh sách các lựa chọn tự hỗ trợ cung cấp cho bạn khả năng để hành động ngay.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '18px', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Quản Lý Tài Khoản</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {["Khôi Phục Tài Khoản Của Bạn", "Quên Tên Người Dùng", "Quên Mật Khẩu", "Chuyển ĐỔi Khu Vực"].map((item, i) => (
                    <div key={i} className="support-tool-item" style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span style={{ fontSize: '13px' }}>{item}</span>
                      <span style={{ color: '#d13639' }}>↗</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Thanh toán</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {["Hoàn Tiền Giao Dịch Trong Trò Chơi", "Xử lý Bồi hoàn"].map((item, i) => (
                    <div key={i} className="support-tool-item" style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span style={{ fontSize: '13px' }}>{item}</span>
                      <span style={{ color: '#d13639' }}>↗</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Quyền riêng tư và Bảo mật Dữ liệu</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {["Yêu Cầu Dữ Liệu Tài Khoản", "Xóa Tài Khoản"].map((item, i) => (
                    <div key={i} className="support-tool-item" style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span style={{ fontSize: '13px' }}>{item}</span>
                      <span style={{ color: '#d13639' }}>↗</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
{/* Tình Trạng Dịch Vụ & Login Section */}
<div
  style={{
    padding: '60px 10%',
    background: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',   // xếp dọc
    alignItems: 'center',      // căn giữa ngang
    gap: '20px',
  }}
>
  <div
    style={{
      background: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '100%',
    }}
  >  
  {/* Khối tình trạng dịch vụ */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        paddingBottom: '15px',
        marginBottom: '20px',
      }}
    >
    
    </div>
    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
      ĐĂNG NHẬP VÀO TÀI KHOẢN RIOT CỦA BẠN
    </h3>
    <p style={{ fontSize: '14px', color: '#666', marginBottom: '25px' }}>
      Xem yêu cầu, quản lý tài khoản của bạn và tìm sự hỗ trợ kịp thời.
    </p>
    <button
      style={{
        background: '#d13639',
        color: '#fff',
        border: 'none',
        padding: '12px 40px',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '0 auto',
        display: 'block',
      }}
    >
      ĐĂNG NHẬP
    </button> 
    
  </div>
     <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>thông tin</h3>
      <span>
        Liên Minh Huyền Thoại là một tựa game thuộc thể loại MOBA (Multiplayer Online Battle Arena – đấu trường trực tuyến nhiều người chơi). Trò chơi được xây dựng dựa trên cảm hứng từ bản mod Defense of the Ancients (DotA) của Warcraft III: Frozen Throne – một huyền thoại trong làng game PC
      </span>
    
  <div
    style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '8px',
      maxWidth: '600px',
      width: '100%',
    }}
  >
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
      {/* ... danh sách game */}
    </div>
  </div>



  {/* Khối tình trạng dịch vụ giữ nguyên */}
  <div style={{ background: '#fff', padding: '30px', borderRadius: '8px' }}>
    {/* ... */}
  </div>

  
</div>


          {/* Trò chơi của chúng tôi Section */}
          <div style={{ padding: '80px 10%', background: '#fff', textAlign: 'center', }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>Trò chơi của chúng tôi</h2>
            <p style={{ color: '#666', marginBottom: '50px' }}>Tìm sự trợ giúp liên quan đến một trò chơi cụ thể.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                {[
                    { title: "LEAGUE OF LEGENDS", img: "/anha.png" },
                    { title: "VALORANT", img: "/anhb.png" },
                    { title: "TEAMFIGHT TACTICS", img: "/anhc.png" },
                    { title: "2XKO", img: "/anhd.png" },
                    { title: "LEAGUE OF LEGENDS WILD RIFT", img: "/anhe.png" },
                    { title: "LEGENDS OF RUNETERRA", img: "/anhf.png" }
                ].map((game, i) => (
                    <div key={i} className="game-support-card" style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}>
                        <img src={game.img} alt={game.title} style={{ width: '100%', display: 'block', transition: 'transform 0.3s' }} />
                        <div style={{ padding: '15px', background: '#fff', border: '1px solid #eee', borderTop: 'none' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{game.title}</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ background: '#f9f9f9', padding: '100px 10%', textAlign: 'center', backgroundImage: 'url("/bg-contact-white.png")', backgroundSize: 'cover' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Cần hỗ trợ thêm? Liên hệ với chúng tôi.</h2>
              <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto 40px', fontSize: '15px' }}>
                  Trang này chưa phải là giải pháp cuối cùng của bạn đâu. <br/> Hãy liên hệ trực tiếp với chúng tôi để tìm hiểu về những thắc mắc khó giải đáp.
              </p>
              <button style={{ background: '#d13639', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                  GỬI YÊU CẦU HỖ TRỢ
              </button>
          </div>

          {/* --- TRANG CHÂN CỦA HỖ TRỢ --- */}
          <footer style={{ background: '#111', padding: '60px 10% 40px', color: '#ccc', textAlign: 'left', borderTop: '1px solid #222' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }}>
              <div style={{ paddingRight: '20px' }}>
                <img src="/anhriot.png" alt="Riot Games" style={{ height: '45px', opacity: 0.8, marginBottom: '20px', display: 'block' }} />
                <div style={{ fontSize: '12px', lineHeight: '1.8', color: '#888', maxWidth: '300px' }}>
                  <p>© 2026 Riot Games, Inc. Đã đăng ký bản quyền. Liên Minh Huyền Thoại và Tập Đoàn Riot Games là nhãn hiệu hoặc nhãn hiệu đã đăng ký của Tập Đoàn Riot Games.</p>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '20px', fontWeight: 'bold' }}>Tham khảo</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px' }}>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Chính Sách Quyền Riêng Tư</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Tùy Chọn Cookie</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Điều Khoản Sử Dụng</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Nội Dung Bất Hợp Pháp</a>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '20px', fontWeight: 'bold' }}>Theo Dõi Chúng Tôi</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px' }}>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Facebook</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Instagram</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>YouTube</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>X</a>
                  <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Twitch</a>
                </div>
              </div>
              
           </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', marginTop: '30px', paddingLeft: '5px' }}>
              {[
                { src: "/anhfb.png", link: "#" },
                { src: "/anhi.png", link: "#" },
                { src: "/anhytb.png", link: "#" },
                { src: "/anhx.png", link: "#" },
                { src: "/anhcam.png", link: "#" }
              ].map((item, i) => (
                <a key={i} href={item.link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <img 
                    src={item.src} 
                    alt="social-icon" 
                    style={{ width: '24px', height: '24px', opacity: 0.5, transition: '0.3s' }} 
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'} 
                  />
                </a>
              ))}
            </div>
          </footer>
        </div> 
) : showChampionsPage ? (
  <div className="champions-page-new" style={{ background: '#010a13' }}>
    {/* --- TRANG CHI TIẾT TƯỚNG --- */}
    {selectedChampion ? (
      <div className="champion-detail-wrapper">
        
        {/* PHẦN 1: HEADER (ẢNH NỀN + MÔ TẢ) */}
        <div className="champion-detail-view" style={{ position: 'relative', minHeight: '100vh', paddingTop: '80px' }}>
          <button 
            onClick={() => { setSelectedChampion(null); setActiveSkill(0); }} 
            style={{ position: 'absolute', top: '100px', left: '10%', zIndex: 10, background: 'none', border: '1px solid #d0a85c', color: '#fff', padding: '8px 20px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            ← Quay lại danh sách
          </button>

          <div style={{ position: 'relative', width: '100%', height: '850px', overflow: 'hidden' }}>
            <img src={selectedChampion.img} alt={selectedChampion.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(1,10,19,1) 15%, rgba(1,10,19,0.7) 40%, transparent 100%)' }}></div>
            
            <div style={{ position: 'absolute', top: '25%', left: '10%', maxWidth: '600px', zIndex: 5 }}>
              <h3 style={{ color: '#d0a85c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', fontSize: '18px' }}>{selectedChampion.title || "QUỶ KIẾM DARKIN"}</h3>
              <h1 style={{ fontSize: '90px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', margin: '0 0 20px 0', lineHeight: '0.9' }}>{selectedChampion.name}</h1>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#ccc', marginBottom: '40px', textAlign: 'justify' }}>Từng là những người bảo hộ cao quý của Shurima... {selectedChampion.name} cùng đồng bọn cuối cùng lại trở thành một mối hiểm họa còn lớn hơn đối với cả Runeterra.</p>
              <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                <div style={{ border: '1px solid #333', padding: '15px 30px', textAlign: 'center', minWidth: '140px' }}>
                  <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>VAI TRÒ</div>
                  <div style={{ fontWeight: 'bold', color: '#d0a85c', fontSize: '14px' }}>ĐẤU SĨ</div>
                </div>
                <div style={{ border: '1px solid #333', padding: '15px 30px', textAlign: 'center', minWidth: '140px' }}>
                  <div style={{ color: '#888', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>ĐỘ KHÓ</div>
                  <div style={{ fontWeight: 'bold', color: '#d0a85c', fontSize: '14px' }}>TRUNG BÌNH</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PHẦN 2: KỸ NĂNG */}
        <div style={{ background: '#0a0a0c', padding: '100px 10%', borderTop: '1px solid #222' }}>
          <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '60px', fontWeight: '900', fontStyle: 'italic', marginBottom: '40px', textTransform: 'uppercase' }}>KỸ NĂNG</h2>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                {['q.png', 'w.png', 'e.png', 'r.png', 't.png'].map((img, index) => (
                  <div key={index} onClick={() => setActiveSkill(index)} style={{ width: '70px', height: '70px', cursor: 'pointer', border: activeSkill === index ? '2px solid #d0a85c' : '1px solid #333', padding: '3px' }}>
                    <img src={`/${img}`} alt="skill" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '24px', textTransform: 'uppercase' }}>{activeSkill === 0 ? "ĐƯỜNG KIẾM TUYỆT DIỆT" : "KỸ NĂNG TƯỚNG"}</h3>
                <p style={{ color: '#d0a85c', fontWeight: 'bold', margin: '10px 0' }}>{activeSkill === 0 ? "NỘI TẠI" : "KÍCH HOẠT"}</p>
                <p style={{ color: '#888', lineHeight: '1.6' }}>Thường kỳ, đòn đánh kế tiếp của Aatrox sẽ gây thêm sát thương phép và hồi máu, dựa trên máu tối đa của mục tiêu.</p>
              </div>
            </div>
            <div style={{ flex: 1.2 }}>
              <div style={{ border: '1px solid #d0a85c', padding: '10px' }}><video key={activeSkill} width="100%" autoPlay muted loop><source src="/lmht.mp4" type="video/mp4" /></video></div>
            </div>
          </div>
        </div>

        {/* PHẦN 3: TRANG PHỤC (ĐÃ CHỈNH RỘNG VÀ THÊM DANH SÁCH) */}
        <div style={{ background: '#fff', padding: '80px 0', color: '#010a13', textAlign: 'center' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '30px' }}>TRANG PHỤC HIỆN CÓ</h2>
          
          {/* Ảnh lớn hiển thị trang phục - Đã chỉnh rộng ra (maxWidth 1400px) */}
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
            <img src="/20.png" alt="Skin Large" style={{ width: '100%', height: 'auto', display: 'block', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>

       {/* Danh sách 5 ảnh nhỏ có tên bên dưới */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', padding: '0 10%' }}>
  {[
    { name: "AATROX" },
    { name: "AATROX CÔNG LÝ" },
    { name: "AATROX MÁY MÓC" },
    { name: "AATROX THỢ SĂN ĐẠI DƯƠNG" },
    { name: "AATROX HUYẾT NGUYỆT" }
  ].map((skin, i) => (
    <div key={i} style={{ flex: 1, cursor: 'pointer' }}>
      {/* Sửa lại đường dẫn file ở đây: từ skin_${i}.jpg thành a${i}.png */}
      <img 
        src={`/a${i}.png`} 
        alt={skin.name} 
        style={{ 
          width: '100%', 
          border: i === 0 ? '2px solid #d0a85c' : '1px solid #eee' 
        }} 
      />
      <p style={{ 
        fontSize: '11px', 
        fontWeight: 'bold', 
        marginTop: '15px', 
        color: i === 0 ? '#d0a85c' : '#888', 
        textTransform: 'uppercase' 
      }}>
        {skin.name}
      </p>
    </div>
  ))}
</div>
          <div style={{ width: '80%', height: '1px', background: '#eee', margin: '50px auto' }}></div>
        </div>

        {/* PHẦN 4: FOOTER (PHẦN KẾT) - Y HỆT MẪU ẢNH 3 & 4 */}
        <footer style={{ background: '#111', padding: '60px 0', color: '#fff', textAlign: 'center', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span style={{ cursor: 'pointer' }}>VỀ LIÊN MINH HUYỀN THOẠI</span>
            <span style={{ cursor: 'pointer' }}>HỖ TRỢ</span>
            <span style={{ cursor: 'pointer' }}>TRANG ESPORTS CHÍNH</span>
          </div>
          <div className="footer-social-icons">
              <a href="#" className="social-icon-box"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-youtube"></i></a>
            </div>

          <div style={{ marginBottom: '20px' }}>
            <img src="/anhriot.png" alt="Riot" style={{ height: '30px', marginRight: '20px' }} />
            <img src="/ung.png" alt="VNG" style={{ height: '30px' }} />
          </div>

          <p style={{ color: '#888', maxWidth: '800px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            
              <p>© 2009-2026 bởi Tập Đoàn Riot Games. Liên Minh Huyền Thoại và Riot Games là nhãn hiệu của Riot Games, Inc.</p>
              <p>Công Ty Cổ Phần Tập Đoàn VNG.</p>
              <p>Địa chỉ: 706 Đường số 13, Phường Tân Thuận, Thành phố Hồ Chí Minh, Vietnam</p>
              <p>Giấy phép số 45/GP-PTTH&TTĐT cấp ngày 27/02/2025.</p>
              <p>Quyết định phát hành số 198/QĐ-PTTH&TTĐT cấp ngày 28/05/2025.</p>
              <a href="https://giayphep.abei.gov.vn/g1/75196" className="footer-license-link">https://giayphep.abei.gov.vn/g1/75196</a>
            </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontWeight: 'bold' }}>
            <span>CHÍNH SÁCH BẢO MẬT</span>
            <span>ĐIỀU KHOẢN SỬ DỤNG</span>
            <span>TÙY CHỌN COOKIES</span>
          </div>

          <div style={{ marginTop: '40px' }}>
            <img src="/cong.png" alt="18+" style={{ height: '80px' }} />
          </div>
        </footer>
      </div>
 ) : (
   
    /* --- DANH SÁCH TƯỚNG (Đã tích hợp Footer và Hiệu ứng) --- */
    <>
      <div style={{ padding: '100px 10%', minHeight: '100vh', background: '#010a13' }}>
        <h1 style={{ color: '#fff', fontSize: '60px', fontStyle: 'italic', textAlign: 'center', marginBottom: '50px' }}>TƯỚNG</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {filteredChampions.map((champ) => (
            /* Wrapper để nhận hiệu ứng hover */
           <div 
              key={champ.id} 
              className="champion-card-wrapper"
              onClick={() => { setSelectedChampion(champ); window.scrollTo(0, 0); }} 
              style={{ cursor: 'pointer', background: '#061c25', overflow: 'hidden' }}
            >
              {/* Khung giữ nguyên khuôn (Frame) */}
              <div className="champion-card-frame" style={{ width: '100%', overflow: 'hidden' }}>
                <img 
                  src={champ.img} 
                  alt={champ.name} 
                  style={{ width: '100%', display: 'block' }} 
                />
              </div>
              
              <div className="champion-name" style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>
                {champ.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PHẦN FOOTER (GIỮ NGUYÊN VÀ CĂN CHỈNH) --- */}
      <footer style={{ background: '#111', padding: '60px 20px', color: '#fff', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px' }}>
          <span style={{ cursor: 'pointer' }}>VỀ LIÊN MINH HUYỀN THOẠI</span>
          <span style={{ cursor: 'pointer' }}>HỖ TRỢ</span>
          <span style={{ cursor: 'pointer' }}>TRANG ESPORTS CHÍNH</span>
        </div>

        <div className="footer-social-icons">
              <a href="#" className="social-icon-box"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-youtube"></i></a>
            </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px', marginBottom: '25px' }}>
          <img src="/anhriot.png" alt="Riot" style={{ height: '30px' }} />
          <img src="/ung.png" alt="VNG" style={{ height: '22px' }} />
        </div>

        <div style={{ color: '#666', fontSize: '11px', lineHeight: '1.8', maxWidth: '850px', margin: '0 auto 30px' }}>
          <p>© 2009-2022 bởi Tập Đoàn Riot Games. LIÊN MINH HUYỀN THOẠI...</p>
          <p>Công Ty Cổ Phần Tập Đoàn VNG.</p>
          <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, TP. HCM.</p>
          <p>Điện thoại: 1900 561 558</p>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>https://giayphep.abei.gov.vn/g1/75196</a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', fontSize: '11px', fontWeight: 'bold', color: '#fff', marginBottom: '40px' }}>
          <span>CHÍNH SÁCH BẢO MẬT</span>
          <span>ĐIỀU KHOẢN SỬ DỤNG (RIOT)</span>
          <span>TÙY CHỌN COOKIES</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/cong.png" alt="18+" style={{ height: '100px' }} />
        </div>
      </footer>
    </>
  )} 
  </div>
  ) : showNewsPage ? (
  <div className="news-page-wrapper" style={{ background: selectedArticle ? '#020a13' : '#fff', minHeight: '100vh' }}>
    
    {/* --- TRƯỜNG HỢP 1: XEM CHI TIẾT BÀI VIẾT --- */}
  {/* --- HỆ THỐNG PHÂN LUỒNG GIAO DIỆN --- */}
{/* Kiểm tra nếu có bài viết được chọn (dùng chung cho cả tin tức và cập nhật) */}
{(selectedArticle || selectedNews) ? (
  <div className="detail-page-wrapper" style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
    
    {/* 1. Menu Riot cố định (Dùng đúng logo anhriot.png) */}
    <nav style={{ background: '#111', padding: '15px 5%', display: 'flex', alignItems: 'center', gap: '30px', position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
       <img src="/anhriot.png" alt="Riot" style={{ height: '20px', cursor: 'pointer' }} onClick={() => { setSelectedArticle(null); setSelectedNews(null); }} />
       <div style={{ display: 'flex', gap: '20px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => { setSelectedArticle(null); setSelectedNews(null); }}>TRANG CHỦ</span>
          <span style={{ color: '#d0a85c' }}>CHI TIẾT</span>
       </div>
       <button style={{ marginLeft: 'auto', background: '#00bcff', border: 'none', padding: '8px 15px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>CHƠI NGAY</button>
    </nav>

    {/* 2. Phần nội dung bài viết */}
    <div style={{ paddingTop: '50px', flex: 1 }}> 
      {(() => {
        const data = selectedArticle || selectedNews;
        return (
          <>
            {/* Banner to */}
            <div style={{ width: '100%', height: '500px', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
              <img src={data.img} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
              <div style={{ position: 'absolute', textAlign: 'center', width: '100%', padding: '0 20px' }}>
                 <h1 style={{ color: '#fff', fontSize: '60px', textTransform: 'uppercase', fontStyle: 'italic', fontWeight: '900' }}>
                    {data.title}
                 </h1>
              </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ color: '#d0a85c', fontWeight: 'bold' }}>{data.date}</p>
                <h2 style={{ fontSize: '48px', margin: '10px 0', fontWeight: '800', color: '#111' }}>{data.title}</h2>
                <p style={{ color: '#666', fontSize: '18px' }}>{data.desc || "Công bố danh sách co-streamer chính thức"}</p>
              </div>

              {/* Phần text có chữ màu xanh y hệt ảnh mẫu */}
              <div style={{ fontSize: '17px', lineHeight: '1.8', color: '#333' }}>
                <p>Dưới đây là danh sách các co-streamer sẽ đồng hành cùng giải đấu:</p>
                
                <h3 style={{ margin: '30px 0 15px', fontWeight: '900', textTransform: 'uppercase' }}>CO-STREAMER CỦA ĐỘI TUYỂN</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}>•Xin chào, hôm nay chúng tôi là Pabro và Meddler sẽ tóm tắt nhanh các nội dung của cập nhật từ đội ngũ phát triển:

Trong Mùa 2 của năm 2026, điểm đến sẽ là vùng ngoại ô Demacia, nơi chúng ta sẽ theo chân Vayne trong hành trình săn lùng ác quỷ và tìm hiểu thêm một chút về quá khứ của cô dọc đường đi.
Chúng tôi sẽ ra mắt truyện tranh động cho Vayne vào thời điểm cuối Mùa giải này.
Mùa giải này sẽ ngắn hơn, kéo dài tổng cộng 6 bản cập nhật thay vì 8 như thường lệ để nhường chỗ cho một mùa giải dài hơn vào cuối năm nay.
Chúng tôi cũng có một số thay đổi đối với Battle Pass để thời gian hoàn thành sẽ phù hợp với độ dài ngắn hơn của Mùa giải này.
Đúng như yêu cầu của nhiều bạn, chúng tôi cũng sẽ cho phép mua trực tiếp các trang phục theo mùa không phải Hàng Hiệu từ Pass, thay thế các vị trí đó bằng hộp vật phẩm Trang Phục Kỳ Bí Ác Quỷ với tỉ lệ rơi ra một trang phục Sử Thi mang chủ đề ác quỷ.
Các trang phục Hàng Hiệu tiếp theo sẽ là Shaco và LeBlanc, tiếp theo đó là Veigar trong Mùa 3.
Các trang phục khác sẽ ra mắt trong Mùa giải này bao gồm Ivern Ếch Xanh Lữ Hành, SIÊU PHẨM: Quinn, Irelia Bánh Mì Que và Vel’Koz Spaghetti. <img 
        src="phattrien.png" 
        style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }} 
      /> - <span style={{ cursor: 'pointer' }}>Về mặt lối chơi, trong Mùa giải này chúng tôi sẽ có một số điều chỉnh nâng cấp chất lượng trải nghiệm cho các nhiệm vụ vai trò, bắt đầu mở rộng sự đa dạng trong lối xây dựng tướng, mang trở lại một số Ngọc Bổ Trợ quen thuộc, loại bỏ một số trang bị cũ và thêm vào các trang bị mới.
Chúng tôi đã cập nhật nơi bạn nhận tiến trình cho nhiệm vụ vai trò của mình ở đường trên và đường giữa, cũng như mức độ nới lỏng khi bạn đi đảo đường. Bạn vẫn sẽ cần phải ra đường để tăng tiến trình nhiệm vụ vai trò, nhưng bạn sẽ không bị phạt khi làm những việc phù hợp với chất tướng của mình như đảo đường hoặc chặn lính.
Ngoài ra, chúng tôi đã điều chỉnh phần thưởng cho đường trên để cung cấp nhiều kinh nghiệm hơn khi tham gia giao tranh tổng và thay thế bùa lợi biến về cường hóa của đường giữa thành 6% SMCK và SMPT cộng thêm.
Mục tiêu của chúng tôi với những thay đổi này là khuyến khích hơn sự đa dạng của các hệ tướng và số tướng được chơi ở các vai trò này, thay vì chủ yếu khuyến khích những tướng đẩy lẻ ở đường trên, hoặc những tướng không đảo đường ở đường giữa, đồng thời cung cấp thêm một số phần thưởng tăng tiến sức mạnh cho người đi đường giữa.
Chúng tôi cũng bắt đầu khuyến khích hơn việc hỗ trợ các lối xây dựng thay thế cho các tướng nhằm khuyến khích tính sáng tạo và chiến thuật; ví dụ như Ezreal SMPT, Kennen Xạ Thủ SMCK hay Xin Zhao tốc độ đánh.
Lửa Tử Thần và Xung Kích Bão Tố sẽ quay trở lại trong Mùa giải này, trong đó Xung Kích Bão Tố sẽ thay thế Tăng Tốc Pha làm ngọc tăng tốc độ di chuyển.
Chúng tôi cũng có nhiều điều chỉnh đối với các trang bị, bao gồm Bình Minh & Hoàng Hôn, hai trang bị khởi đầu mới, giày hút máu toàn phần mới và loại bỏ Hành Trang Thám Hiểm cùng với Gươm Thức Thời.
Vị tướng tiếp theo của chúng ta sẽ là một sát thủ SMPT đường giữa.
Võ Đài sẽ có một cập nhật lớn trong Mùa 2!
Các trận Võ Đài tiêu chuẩn sẽ được thay thế bằng Sự Kiện, đây là biến tấu mới làm thay đổi cách chơi Võ Đài.
Ba Sự Kiện mà chúng tôi đã lên kế hoạch trong suốt Mùa 2 là 3x6 (nơi sảnh chờ bao gồm sáu đội ba người), Quả Cảm (nơi lựa chọn duy nhất của bạn là Quả Cảm hoặc Đám Đông Cổ Vũ) và Võ Đài Siêu Tốc (nơi chỉ có bốn đội hai người và nhịp độ trận đấu nhanh hơn).
Chúng tôi cũng sẽ thêm một bản đồ mới cho Võ Đài là Rừng Kháng Ma Thạch và thực hiện một số thay đổi đối với Rừng Cổ Đại.<img src="ronga.png"></img>
</span></li>
                  <li style={{ marginBottom: '10px' }}>•Một tính năng mới khác sắp có trên Võ Đài là Cấp Độ Nâng Cấp, cho phép bạn siêu cường hóa các nâng cấp yêu thích của mình bằng cách làm cho chúng mạnh hơn hoặc thêm hiệu ứng mới, ví dụ như Xả Đạn Hàng Loạt bắn ra nhiều tên lửa hơn.
Chúng tôi cũng có hơn 20 khách mời danh dự mới và được làm lại sẽ xuất hiện trong suốt Mùa giải này. Một số trong đó bao gồm Nocturne, người sẽ tạo ra các vùng tối xung quanh bản đồ, hoặc Shaco, người sẽ tạo ra sự hỗn loạn và biến tất cả các lượt đổi nâng cấp của bạn thành bậc ngẫu nhiên.
Ngoài ra cũng có hơn 30 Nâng Cấp mới xuất hiện lần đầu trong Võ Đài, một số được mang từ ARAM Hỗn Loạn sang và một số thì hoàn toàn mới đối với Liên Minh Huyền Thoại!
Sau quá trình thử nghiệm, phân tích và điều chỉnh kỹ lưỡng, chúng tôi đã đạt tới ngưỡng mà WASD có mức hiệu suất tương đương với điều khiển Trỏ và Bấm. Vẫn còn một khoảng cách nhỏ về tỷ lệ thắng giữa các phương thức điều khiển, trong đó Trỏ và Bấm đang nhỉnh hơn một chút.
Do đó, WASD cuối cùng đã sẵn sàng cho chế độ Xếp Hạng và sẽ chính thức ra mắt trong phiên bản 26.9.
Chúng tôi cũng sẽ thêm các phím tắt riêng cho từng tướng vào trò chơi trong phiên bản này, vì vậy bạn sẽ có thể định cấu hình các phím tắt khác nhau cho tất cả các tướng tủ của mình.
Vào cuối mùa giải này, chúng tôi sẽ thêm một tính năng cung cấp cho bạn tùy chọn bỏ phiếu để kết thúc trận đấu sớm khi phát hiện các hành vi phá game.
Những người chơi ở đội đồng minh sẽ không bị trừ ĐNG, những người chơi ở đội địch sẽ nhận được toàn bộ ĐNG như thể họ đã thắng, còn người chơi vi phạm và tổ đội tạo sẵn của họ sẽ bị trừ ĐNG. Dĩ nhiên, người chơi vi phạm cũng sẽ phải nhận những hình phạt thích đáng.
Chúng tôi sẽ bắt đầu triển khai tích hợp mới giữa Discord và client Liên Minh, bắt đầu bằng phiên bản beta ở Mỹ, Canada và Brazil. Nói ngắn gọn, bạn sẽ có thể liên kết tài khoản Discord và Riot của mình để dễ dàng mời bạn bè trên Discord tham gia các tổ đội trong trò chơi, xem ai đang chơi và tham gia các phòng chờ Liên Minh thông qua liên kết tổ đội.
Cửa Hàng Cá Nhân sẽ quay trở lại vào ngày 05/05.
Cửa Hiệu Tinh Hoa sẽ ra mắt vào tuần sau đó, ngày 13/05.
Hãy xem toàn bộ video để chiêm ngưỡng một số khoảnh khắc nổi bật tuyệt vời từ cộng đồng! <span style={{  cursor: 'pointer' }}>Leomiho, Hoàng Sama, Ling Cao Thủ</span></li> 
                  
                </ul>
               
 <h3 style={{ textAlign: 'center', marginTop: '50px', fontWeight: '900', textTransform: 'uppercase' }}>
  Những Bài Viết Liên Quan
</h3>
<div className="related-posts-grid">
  {/* Khối 1 */}
  <div className="related-item">
  <div className="img-container">
    <img src="skay.png" alt="News 1" />
  </div>
    <div className="category-tag">
      ĐỘI NGŨ PHÁT TRIỂN <span className="date-text">15/4/2026</span>
    </div>
    <div className="related-title">/ĐNPT: WASD RA MẮT CHẾ ĐỘ XẾP HẠNG</div>
    <div className="related-desc">
      Sau nhiều tháng thử nghiệm và phản hồi, WASD cuối cùng đã sẵn sàng cho thời khắc trọng đại.
    </div>
  </div>

  {/* Khối 2 */}
  <div className="related-item">
    <div className="img-container">
      <img 
        src="2ong.png" 
        alt="News 2" 
        onClick={() => setVideoOpen(true)} 
        style={{ cursor: 'pointer' }} 
      />
    </div>
    <div className="category-tag">
      ĐỘI NGŨ PHÁT TRIỂN <span className="date-text">15/4/2026</span>
    </div>
    <div className="related-title">CẬP NHẬT TỪ ĐNPT: CẬP NHẬT VÕ ĐÀI & NỘI DUNG KHÁC</div>
    <div className="related-desc">
      Pabro và Meddler nói về Mùa 2: Xứ Quỷ Cuồng Loạn, thay đổi về lối chơi và hơn thế.
    </div>
  </div>

  {/* Khối 3 */}
  <div className="related-item">
    <div className="img-container">
      <img src="mana.png" alt="News 3" />
    </div>
    <div className="category-tag">
      ĐỘI NGŨ PHÁT TRIỂN <span className="date-text">15/4/2026</span>
    </div>
    <div className="related-title">/ĐNPT: NÂNG TẦM VÕ ĐÀI</div>
    <div className="related-desc">
      Tất cả những thay đổi sẽ đến với chế độ Võ Đài trong Mùa 2 sắp tới.
    </div>
  </div>
</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',  }}>
                   <span style={{ cursor: 'pointer' }}>BLV Louis Nguyen</span>
                   <span style={{ cursor: 'pointer' }}>Đức Mạnh</span>
                   <span style={{ cursor: 'pointer' }}>Hoàng Luân</span>
                   <span style={{ cursor: 'pointer' }}>Văn Tùng</span>
                </div>
              </div>

              <button 
                onClick={() => { setSelectedArticle(null); setSelectedNews(null); }} 
                style={{ marginTop: '50px', padding: '12px 30px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ← QUAY LẠI DANH SÁCH
              </button>
            </div>
          </>
        );
      })()}
    </div>

    {/* 3. Footer (Dùng đúng logo anhriot.png và anhlol.png của ông) */}
          
        {/* PHẦN 4: FOOTER (PHẦN KẾT) - Y HỆT MẪU ẢNH 3 & 4 */}
        <footer style={{ background: '#111', padding: '60px 0', color: '#fff', textAlign: 'center', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span style={{ cursor: 'pointer' }}>VỀ LIÊN MINH HUYỀN THOẠI</span>
            <span style={{ cursor: 'pointer' }}>HỖ TRỢ</span>
            <span style={{ cursor: 'pointer' }}>TRANG ESPORTS CHÍNH</span>
          </div>
          <div className="footer-social-icons">
              <a href="#" className="social-icon-box"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-youtube"></i></a>
            </div>

          <div style={{ marginBottom: '20px' }}>
            <img src="/anhriot.png" alt="Riot" style={{ height: '30px', marginRight: '20px' }} />
            <img src="/ung.png" alt="VNG" style={{ height: '30px' }} />
          </div>

          <p style={{ color: '#888', maxWidth: '800px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            
              <p>© 2009-2026 bởi Tập Đoàn Riot Games. Liên Minh Huyền Thoại và Riot Games là nhãn hiệu của Riot Games, Inc.</p>
              <p>Công Ty Cổ Phần Tập Đoàn VNG.</p>
              <p>Địa chỉ: 706 Đường số 13, Phường Tân Thuận, Thành phố Hồ Chí Minh, Vietnam</p>
              <p>Giấy phép số 45/GP-PTTH&TTĐT cấp ngày 27/02/2025.</p>
              <p>Quyết định phát hành số 198/QĐ-PTTH&TTĐT cấp ngày 28/05/2025.</p>
              <a href="https://giayphep.abei.gov.vn/g1/75196" className="footer-license-link">https://giayphep.abei.gov.vn/g1/75196</a>
            </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontWeight: 'bold' }}>
            <span>CHÍNH SÁCH BẢO MẬT</span>
            <span>ĐIỀU KHOẢN SỬ DỤNG</span>
            <span>TÙY CHỌN COOKIES</span>
          </div>

          <div style={{ marginTop: '40px' }}>
            <img src="/cong.png" alt="18+" style={{ height: '80px' }} />
          </div>
        </footer>

  </div>
) : (
<div>
      /* --- TRƯỜNG HỢP 2: DANH SÁCH TIN TỨC --- */
      <div className="news-page-container" style={{ paddingTop: '100px', background: '#0a1428' }}>
  <div className="news-header-banner" style={{ 
    background: '#0a1428', // ĐỔI TỪ #0a0e13 SANG #0a1428
    padding: '80px 10%', 
    textAlign: 'left', // Web Riot thường để tiêu đề bên trái cho ngầu
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #1e282d'
  }}>
    <h2 className="news-main-title-large" style={{ 
      color: '#fff', 
      fontSize: '80px', 
      fontStyle: 'italic', 
      fontWeight: '900', 
      textTransform: 'uppercase',
      margin: 0,
      letterSpacing: '-2px' // Làm chữ sát nhau giống mẫu
    }}>
      {newsTitle}
    </h2>
  </div>
        <div className="news-list-content" style={{ background: '#fff', padding: '50px 10%' }}>
           <div className="news-full-grid">

            {[...Array(newsTitle === "RIOT GAMES" ? 3 : visibleCount).keys()].map((item) => {
              let currentImg = (item >= 12 && item < 24) ? "/ace.png" : "/ga.png";
              const baseDate = new Date('2026-04-01');
              baseDate.setDate(baseDate.getDate() - item);
              const formattedDate = `${baseDate.getDate()}/${baseDate.getMonth() + 1}/${baseDate.getFullYear()}`;
              
              let categoryName = "CẬP NHẬT";
              if (newsTitle === "ESPORTS") categoryName = "ESPORTS";
              if (newsTitle === "CỘNG ĐỒNG") categoryName = "CỘNG ĐỒNG";

              const article = {
                id: item,
                title: `Chi tiết ${newsTitle.toLowerCase()} #${item + 1}`,
                img: currentImg,
                category: categoryName,
                date: formattedDate
              };

              return (
                <div className="news-card" key={item} onClick={() => { setSelectedArticle(article); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>
                  <div className="news-card-img-wrapper" style={{ overflow: 'hidden' }}>
                    <img src={currentImg} alt={`News ${item}`} style={{ width: '100%', transition: '0.3s' }} />
                  </div>
                  <div className="news-info" style={{ color: '#000', padding: '15px 0' }}>
                    <p className="news-category" style={{ fontSize: '12px' }}>
                      <span style={{ color: '#d0a85c', fontWeight: 'bold' }}>{categoryName}</span>
                      <span> | {formattedDate}</span>
                    </p>
                    <h3 className="news-item-title" style={{ fontSize: '20px', margin: '10px 0' }}>{article.title}</h3>
                    <p className="news-item-desc txt-desc" style={{ color: '#666', fontSize: '14px' }}>Nội dung mô tả tin tức ngắn gọn hiển thị tại đây.</p>
                  </div>
                </div>
              );
            })}
          </div>

          {newsTitle !== "RIOT GAMES" && (
            <div className="load-more-box" style={{ textAlign: 'center', marginTop: '40px' }}>
              <p className="load-more-text" onClick={() => setVisibleCount(visibleCount + 12)} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#000' }}>
                HIỆN THÊM <span style={{ color: '#d0a85c' }}>+</span>
              </p> 
              
            </div>
          )}  
          </div>
        <footer className="riot-footer-final">
            <div className="footer-links-row">
              <a href="#" onClick={(e) => { e.preventDefault(); resetHome(); }}>VỀ LIÊN MINH HUYỀN THOẠI</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowSupportPage(true); }}>HỖ TRỢ</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openExternalEsports(); }}>TRANG ESPORTS CHÍNH</a>
            </div>
            
            <div className="footer-social-icons">
              <a href="#" className="social-icon-box"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-youtube"></i></a>
            </div>

            <div className="footer-copyright-text">
              <div className="footer-logos-container">
                <img src="/anhriot.png" alt="Riot Games" className="footer-logo-item" />
                <img src="/ung.png" alt="VNGGames" className="footer-logo-item" />
              </div>
              <p>© 2009-2026 bởi Tập Đoàn Riot Games. Liên Minh Huyền Thoại và Riot Games là nhãn hiệu của Riot Games, Inc.</p>
              <p>Công Ty Cổ Phần Tập Đoàn VNG.</p>
              <p>Địa chỉ: 706 Đường số 13, Phường Tân Thuận, Thành phố Hồ Chí Minh, Vietnam</p>
              <p>Giấy phép số 45/GP-PTTH&TTĐT cấp ngày 27/02/2025.</p>
              <p>Quyết định phát hành số 198/QĐ-PTTH&TTĐT cấp ngày 28/05/2025.</p>
              <a href="https://giayphep.abei.gov.vn/g1/75196" className="footer-license-link">https://giayphep.abei.gov.vn/g1/75196</a>
            </div>

            <div className="footer-bottom-nav">
              <a href="#">CHÍNH SÁCH BẢO MẬT</a>
              <a href="#">ĐIỀU KHOẢN SỬ DỤNG</a>
              <a href="#">TÙY CHỌN COOKIES</a>
            </div>

            <div className="footer-rating-img">
              <img src="/cong.png" alt="18+" style={{ width: '250px' }} /> 
              
            </div> 
      
           
          </footer> 
        
        </div>
      </div>
    )}  
  
  </div>
) : (
        <>
          <div className="hero-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src="/lmht.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">LIÊN MINH<br />HUYỀN THOẠI</h1>
              <button className="btn-play-free">CHƠI MIỄN PHÍ</button>
            </div>
          </div>

        <section className="news-section">
  <div className="news-header">
    <h2 className="news-main-title">TIN TỨC TIÊU BIỂU</h2>
    <span className="explore-more" onClick={() => { setNewsTitle("TIN TỨC"); setShowNewsPage(true); }} style={{ cursor: 'pointer' }}>
      KHÁM PHÁ NGAY ↗
    </span>
  </div>
  <div className="news-grid">

    
    {/* Tin số 1 */}
    <div className="news-card" onClick={() => { 
        setNewsTitle("TIN TỨC"); 
        setShowNewsPage(true); 
        setSelectedNews('news1'); 
      }}
      style={{ cursor: 'pointer' }}
    > 
      <div className="news-card-img-wrapper"><img src="/anh1.png" alt="News 1" /></div>
      <div className="news-info">
        <p className="news-category">
          <span style={{ color: '#d0a85c', fontWeight: 'bold' }}>THÔNG BÁO</span>
          <span style={{ color: '#000' }}> | 2/4/2026</span>
        </p>
        <h3 className="news-item-title">Co-streamer Trực Tuyến Kỳ 2 LCP 2026</h3>
      </div>
    </div>

    {/* Tin số 2 */}
    <div className="news-card" onClick={() => { 
        setNewsTitle("TIN TỨC"); 
        setShowNewsPage(true); 
        setSelectedNews('news2'); 
      }}
      style={{ cursor: 'pointer' }}
    > 
      <div className="news-card-img-wrapper"><img src="/anh2.png" alt="News 2" /></div>
      <div className="news-info">
        <p className="news-category">
          <span style={{ color: '#d0a85c', fontWeight: 'bold' }}>ESPORTS</span>
          <span style={{ color: '#000' }}> | 24/3/2026</span>
        </p>
        <h3 className="news-item-title">Kỳ 2 LCP 2026</h3>
      </div>
    </div>

    {/* Tin số 3 */}
    <div className="news-card" onClick={() => { 
        setNewsTitle("TIN TỨC"); 
        setShowNewsPage(true); 
        setSelectedNews('news3'); 
      }}
      style={{ cursor: 'pointer' }}
    > 
      <div className="news-card-img-wrapper"><img src="/anh3.png" alt="News 3" /></div>
      <div className="news-info">
        <p className="news-category">
          <span style={{ color: '#d0a85c', fontWeight: 'bold' }}>ESPORTS</span>
          <span style={{ color: '#000' }}> | 22/3/2026</span>
        </p>
        <h3 className="news-item-title">Top Các Pha Xử Lý - Bán Kết</h3>
      </div>
    </div>
  </div>
</section>

          <section className="champ-select-section">
            <div className="champ-center-visual">
              <div className="outer-circle"></div>
              <img src="/akali.png" alt="Akali" className="akali-main-img" />
              <div className="champ-overlay-text">
                <p className="txt-sub">CHỌN NGAY MỘT</p>
                <h2 className="txt-main">TƯỚNG</h2>
                <p className="txt-desc">
                  Cho dù thích lao vào giao tranh, thích hỗ trợ đồng đội hoặc cả hai, bạn sẽ luôn tìm thấy vị trí thích hợp dành cho mình trong Summoner's Rift.
                </p>
                <div className="btn-group-overlay">
                  <button className="btn-gold-style" onClick={() => setShowChampionsPage(true)}>KHÁM PHÁ THÊM CÁC VỊ TƯỚNG</button>
                  <button className="btn-blue-style">CHƠI NGAY</button>
                </div>
                <div className="role-icons-list">
  <div className="role-item active">
    <img src="/1.png" className="role-icon-img" />
    <p>SÁT THỦ</p>
  </div>

  <div className="role-item">
    <img src="/2.png" className="role-icon-img" />
    <p>Đấu sĩ</p>
  </div>

  <div className="role-item">
    <img src="/3.png" className="role-icon-img" />
    <p>Pháp sư</p>
  </div>

  <div className="role-item">
    <img src="/4.png" className="role-icon-img" />
    <p>Xạ thủ</p>
  </div>

  <div className="role-item">
    <img src="/5.png" className="role-icon-img" />
    <p>Hỗ trợ</p>
  </div>

  <div className="role-item">
    <img src="/6.png" className="role-icon-img" />
    <p>Đỡ đòn</p>
  </div>

                
                </div>
              </div>
              <div className="akali-label-bottom">
                <h2>AKALI</h2>
                <p>Sát Thủ Đơn Độc</p>
              </div>
            </div>
          </section>

          <section className="ways-to-play-section">
            <img src="/tuongne.png" alt="Ways to Play" className="full-bg-image" />
            
            <div className="modes-content-overlay">
              <h3>RẤT NHIỀU CÁCH</h3>
              <h2 className="skins-title-custom" style={{fontSize: '50px'}}>CHƠI</h2>
              <button className="btn-gold-style">CHƠI NGAY</button>
            
            </div>
            <div className="video-circle-box">
              <div className="gold-ring"></div>
              <div className="inner-circle-clip">
                <video autoPlay loop muted playsInline><source src="/hehe.mp4" type="video/mp4" /></video>
              </div>
              <div className="video-caption">
                <h4>CHẾ ĐỘ CHƠI PHỔ BIẾN NHẤT</h4>
                <p>Dọn đường, tham gia giao tranh tổng, phá hủy Nhà Chính của địch.</p>
              </div>
            </div>
          </section>

          <section style={{ width: '100%', background: '#010a13', display: 'flex', justifyContent: 'center', marginTop: '-1px' }}>
            <div style={{ width: '85%', position: 'relative', lineHeight: 0 }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}><source src="/hi.mp4" type="video/mp4" /></video>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn-gold-style" style={{ padding: '15px 50px' }}>CHƠI MIỄN PHÍ</button>
              </div>
            </div>
          </section> 
         
{/* --- KHU VỰC FOOTER CHUNG --- */}
          {/* Footer này sẽ xuất hiện ở cuối Trang chủ, Tướng, Tin tức, Esports, và mọi trang khác */}
          <footer className="riot-footer-final">
            <div className="footer-links-row">
              <a href="#" onClick={(e) => { e.preventDefault(); resetHome(); }}>VỀ LIÊN MINH HUYỀN THOẠI</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowSupportPage(true); }}>HỖ TRỢ</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openExternalEsports(); }}>TRANG ESPORTS CHÍNH</a>
            </div>
            
            <div className="footer-social-icons">
              <a href="#" className="social-icon-box"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon-box"><i className="fab fa-youtube"></i></a>
            </div>

            <div className="footer-copyright-text">
              <div className="footer-logos-container">
                <img src="/anhriot.png" alt="Riot Games" className="footer-logo-item" />
                <img src="/ung.png" alt="VNGGames" className="footer-logo-item" />
              </div>
              <p>© 2009-2026 bởi Tập Đoàn Riot Games. Liên Minh Huyền Thoại và Riot Games là nhãn hiệu của Riot Games, Inc.</p>
              <p>Công Ty Cổ Phần Tập Đoàn VNG.</p>
              <p>Địa chỉ: 706 Đường số 13, Phường Tân Thuận, Thành phố Hồ Chí Minh, Vietnam</p>
              <p>Giấy phép số 45/GP-PTTH&TTĐT cấp ngày 27/02/2025.</p>
              <p>Quyết định phát hành số 198/QĐ-PTTH&TTĐT cấp ngày 28/05/2025.</p>
              <a href="https://giayphep.abei.gov.vn/g1/75196" className="footer-license-link">https://giayphep.abei.gov.vn/g1/75196</a>
            </div>

            <div className="footer-bottom-nav">
              <a href="#">CHÍNH SÁCH BẢO MẬT</a>
              <a href="#">ĐIỀU KHOẢN SỬ DỤNG</a>
              <a href="#">TÙY CHỌN COOKIES</a>
            </div>

            <div className="footer-rating-img">
              <img src="/cong.png" alt="18+" style={{ width: '250px' }} />
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;


