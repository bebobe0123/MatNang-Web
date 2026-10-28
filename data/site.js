// Toàn bộ nội dung website nằm trong file này.
// Muốn đổi số điện thoại, địa chỉ, mô tả sản phẩm… chỉ cần sửa ở đây.

// Ảnh minh họa tạm từ Unsplash (giấy phép miễn phí). Thay bằng ảnh thật bằng cách
// đặt file vào public/images/ và đổi đường dẫn, ví dụ: '/images/long-nhan.jpg'.
const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const images = {
  hero: unsplash('1755971103481-3fd82333a80a', 1400),
  longanTree: unsplash('1752368198532-4e5d4c892b91', 1200),
  longanCluster: unsplash('1753444639142-e5cb87c32497'),
  longanBowl: unsplash('1755971103542-c95429c8c0f2'),
  longanPot: unsplash('1755971103909-c2710ea5aad8'),
  longanPlate: unsplash('1755971103541-402280c3befc'),
  longanWhite: unsplash('1597975371283-5461cdf69d5e'),
  lotusPods: unsplash('1750213475073-def17f01f38c'),
  lotusFlower: unsplash('1750213475057-d174ccebbfe4'),
  honeyJar: unsplash('1587049352851-8d4e89133924'),
  honeyDipper: unsplash('1613548058193-1cd24c1bebcf'),
  honeyCup: unsplash('1536788567643-8c2368376526'),
  teaGlass: unsplash('1573784540576-21ddeff9479b'),
  teaLeaves: unsplash('1627435601361-ec25f5b1d0e5'),
  driedFruits: unsplash('1710857397974-f0617001c39e'),
  giftBoxes: unsplash('1766425221306-4d44f4011d4a'),
  giftGreen: unsplash('1764764138818-0b22ab4d4023'),
};

const brand = {
  name: 'Mật Nắng',
  slogan: 'Giữ vị ngọt của mùa hè Bắc Bộ.',
  tagline: 'Nắng làm nên vị ngọt',
  category: 'Nông sản Bắc Bộ',
  shortStory:
    'Mỗi quả nhãn chín ngọt là kết quả của cả một mùa nắng. Mật Nắng chọn nhãn từ những vùng trồng uy tín của Bắc Bộ, sấy và đóng gói cẩn thận để vị ngọt mùa hè ấy theo anh chị đến từng nồi chè, từng ấm trà trong năm.',
};

const contact = {
  phone: '079-888-9955',
  phoneHref: 'tel:+84798889955',
  zaloHref: 'https://zalo.me/0798889955',
  email: 'matnangfoods@gmail.com',
  address: '39 Châu Long, phường Ba Đình, Hà Nội',
  mapQuery: '39 Châu Long, Ba Đình, Hà Nội',
  // Điền khi đã có giấy đăng ký hộ kinh doanh — sẽ tự hiện ở chân trang.
  business: {
    name: '', // ví dụ: 'Hộ kinh doanh Mật Nắng'
    registrationNo: '', // số giấy chứng nhận đăng ký hộ kinh doanh
    issuedBy: '', // nơi cấp
  },
};

const values = [
  { icon: 'map-pin', title: 'Rõ nguồn', text: 'Mỗi lô hàng đều biết đến từ đâu, sấy khi nào.' },
  { icon: 'sparkle', title: 'Đúng vị', text: 'Cùi dày, ngọt thanh, thơm mùi nhãn — lô nào không đạt thì không bán.' },
  { icon: 'handshake', title: 'Thật thà', text: 'Nói về hương vị, nguồn gốc và cách dùng; không hứa điều một món ăn không làm được.' },
  { icon: 'sprout', title: 'Chậm mà chắc', text: 'Ít sản phẩm, làm kỹ từng sản phẩm, rồi mới đi tiếp.' },
];

const storageLongan = [
  'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
  'Sau khi mở, buộc kín miệng túi hoặc cho vào lọ kín; nên bảo quản ngăn mát tủ lạnh để giữ màu và vị.',
  'Hạn sử dụng: ghi trên bao bì.',
];

const products = [
  {
    slug: 'long-nhan-say-kho',
    name: 'Long nhãn sấy khô',
    badge: 'Bán chạy',
    image: images.longanBowl,
    gallery: [images.longanBowl, images.longanPlate, images.longanCluster],
    sizes: ['100 g', '200 g', '500 g', '1 kg'],
    summary: 'Dẻo, ngọt đậm, thơm mùi nhãn — ăn vặt hay nấu chè đều hợp.',
    description:
      'Cùi nhãn chín được tách hạt, sấy đến khi vàng nâu, dẻo, ngọt đậm và thơm mùi nhãn. Ăn trực tiếp như một món quà vặt, hoặc làm nguyên liệu cho những món quen của người Hà Nội.',
    uses: [
      'Ăn trực tiếp.',
      'Nấu chè long nhãn hạt sen, chè long nhãn đậu xanh.',
      'Pha trà long nhãn táo đỏ cùng nước nóng.',
      'Thêm vào sữa chua, cháo, bánh.',
    ],
    storage: storageLongan,
  },
  {
    slug: 'long-nhan-om-sen',
    name: 'Long nhãn ôm sen sấy khô',
    badge: 'Đặc sắc',
    image: images.lotusPods,
    gallery: [images.lotusPods, images.longanPot, images.lotusFlower],
    sizes: ['100 g', '200 g', '500 g', '1 kg'],
    summary: 'Hạt sen bùi bọc trong cùi nhãn ngọt, sấy cùng nhau.',
    description:
      'Mỗi hạt sen được bọc trong một cùi nhãn rồi sấy cùng nhau — vị bùi bùi của sen quyện với vị ngọt của nhãn. Một món trước đây gắn với câu chuyện chè sen long nhãn, nay gói gọn để dùng ngay.',
    uses: [
      'Ăn trực tiếp như một món mứt.',
      'Nấu chè sen long nhãn chỉ với nước và đường phèn.',
      'Bày đĩa mời khách cùng trà.',
    ],
    storage: storageLongan,
  },
  {
    slug: 'mat-ong-hoa-nhan',
    name: 'Mật nhãn',
    subtitle: 'Mật ong hoa nhãn',
    badge: 'Mùa hoa nhãn',
    image: images.honeyJar,
    gallery: [images.honeyJar, images.honeyDipper, images.honeyCup],
    sizes: ['Đang cập nhật'],
    summary: 'Mật ong từ mùa hoa nhãn, màu hổ phách, thơm nhẹ mùi nhãn.',
    description:
      'Mật nhãn là mật ong do đàn ong hút từ hoa nhãn, thu vào mùa nhãn nở hoa. Mật có màu hổ phách, vị ngọt đậm và thoang thoảng mùi nhãn chín. Dùng pha nước ấm, rưới lên bánh mì, sữa chua hay khuấy vào tách trà.',
    uses: [
      'Pha với nước ấm (không quá nóng) cùng vài lát chanh.',
      'Rưới lên bánh mì, bánh kếp, sữa chua.',
      'Khuấy vào trà thay đường.',
    ],
    storage: [
      'Đậy kín nắp, để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
      'Dùng thìa khô, sạch khi lấy mật.',
      'Mật ong có thể kết tinh khi trời lạnh — đây là hiện tượng tự nhiên.',
      'Hạn sử dụng: ghi trên bao bì.',
    ],
    warning: 'Không dùng mật ong cho trẻ dưới 1 tuổi.',
  },
];

// Ô "Dùng Mật Nắng thế nào" — giống mục "Shop by category" của mẫu.
const ways = [
  { title: 'Ăn trực tiếp', image: images.longanPlate, href: '/san-pham/long-nhan-say-kho' },
  { title: 'Nấu chè', image: images.longanPot, href: '/cong-thuc/che-long-nhan-hat-sen' },
  { title: 'Pha trà', image: images.teaGlass, href: '/cong-thuc/tra-long-nhan-tao-do' },
  { title: 'Mời khách', image: images.lotusPods, href: '/san-pham/long-nhan-om-sen' },
  { title: 'Mật ong hoa nhãn', image: images.honeyDipper, href: '/san-pham/mat-ong-hoa-nhan' },
  { title: 'Quà biếu', image: images.giftBoxes, href: '/lien-he' },
];

const posts = [
  {
    slug: 'che-long-nhan-hat-sen',
    title: 'Chè long nhãn hạt sen',
    excerpt: 'Món chè quen của mùa hè Hà Nội: hạt sen bở bùi, long nhãn dẻo ngọt, nước chè trong.',
    image: images.longanPot,
    time: '45 phút',
    serves: '4 người',
    ingredients: ['100 g long nhãn sấy khô', '150 g hạt sen tươi hoặc khô', '100–150 g đường phèn (tùy khẩu vị)', '1,5 lít nước', 'Đá viên (nếu dùng lạnh)'],
    steps: [
      'Hạt sen khô ngâm nước ấm khoảng 2 tiếng; hạt sen tươi rửa sạch, bỏ tâm sen để chè không đắng.',
      'Long nhãn rửa nhanh qua nước, ngâm nước ấm 10 phút cho nở mềm, để ráo.',
      'Đun sôi nước, cho hạt sen vào nấu lửa nhỏ đến khi hạt chín bở (khoảng 25–30 phút).',
      'Thêm đường phèn, khuấy tan rồi cho long nhãn vào, đun thêm 3–5 phút thì tắt bếp.',
      'Dùng nóng hoặc để nguội, thêm đá dùng lạnh.',
    ],
  },
  {
    slug: 'tra-long-nhan-tao-do',
    title: 'Trà long nhãn táo đỏ',
    excerpt: 'Một ấm trà ấm, ngọt dịu tự nhiên cho những buổi chiều se lạnh.',
    image: images.teaGlass,
    time: '15 phút',
    serves: '2 người',
    ingredients: ['15–20 g long nhãn sấy khô', '4–5 quả táo đỏ khô', 'Vài lát gừng (tùy thích)', '500 ml nước sôi', 'Một thìa mật ong hoa nhãn (tùy thích)'],
    steps: [
      'Rửa nhanh long nhãn và táo đỏ; khứa nhẹ táo đỏ để ra vị.',
      'Cho long nhãn, táo đỏ, gừng vào ấm, tráng qua một lượt nước sôi rồi chắt bỏ.',
      'Rót nước sôi vào, đậy nắp hãm 10 phút.',
      'Rót ra tách; đợi trà bớt nóng rồi thêm mật ong nếu muốn ngọt hơn.',
    ],
  },
  {
    slug: 'che-sen-long-nhan-om-sen',
    title: 'Chè sen long nhãn từ long nhãn ôm sen',
    excerpt: 'Không cần bọc từng hạt — long nhãn ôm sen giúp nồi chè xong nhanh mà vẫn đẹp.',
    image: images.lotusPods,
    time: '25 phút',
    serves: '3 người',
    ingredients: ['150 g long nhãn ôm sen sấy khô', '80–120 g đường phèn', '1 lít nước'],
    steps: [
      'Rửa nhanh long nhãn ôm sen, ngâm nước ấm 15 phút cho hạt sen mềm.',
      'Đun nước với đường phèn đến khi tan.',
      'Thả long nhãn ôm sen vào, đun lửa nhỏ 8–10 phút, tránh khuấy mạnh để hạt không bung.',
      'Tắt bếp, để nguội, ướp lạnh trước khi dùng.',
    ],
  },
  {
    slug: 'bao-quan-long-nhan',
    title: 'Cách bảo quản long nhãn giữ màu, giữ vị',
    excerpt: 'Vài thói quen nhỏ giúp túi long nhãn luôn dẻo thơm như lúc mới mở.',
    image: images.longanWhite,
    time: '3 phút đọc',
    serves: '',
    ingredients: [],
    steps: [
      'Chưa mở túi: để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
      'Đã mở túi: buộc kín miệng túi hoặc chuyển sang lọ thủy tinh có nắp kín.',
      'Nên để ngăn mát tủ lạnh để long nhãn giữ màu vàng nâu và vị ngọt.',
      'Luôn dùng tay hoặc thìa khô khi lấy, tránh để hơi nước vào túi.',
      'Hạn sử dụng ghi trên bao bì — dùng trong thời hạn để ngon nhất.',
    ],
  },
];

const nav = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham', children: products.map((p) => ({ label: p.name, href: `/san-pham/${p.slug}` })) },
  { label: 'Về Mật Nắng', href: '/ve-mat-nang' },
  { label: 'Công thức', href: '/cong-thuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];

module.exports = { brand, contact, values, products, ways, posts, nav, images };
