const CREDIT = "原创占位图 / 可替换为你确认可用的剧照或海报";
const TVMAZE_CREDIT = "TVMaze public image feed / original_untouched image";
const FANDOM_CREDIT = "HIMYM Wiki / Fandom community image";

const fandomImages = {
  farhamptonUmbrellaWide: "https://static.wikia.nocookie.net/himym/images/d/d2/67167_408873689168437_724001186_n.jpg",
  farhamptonUmbrellaClose: "https://static.wikia.nocookie.net/himym/images/b/bd/Farhampton9.jpg",
  yellowUmbrellaStreet: "https://static.wikia.nocookie.net/himym/images/b/b5/Ted_-_Yellow_umberella.jpg",
  pineappleBedside: "https://static.wikia.nocookie.net/himym/images/a/a1/PINEAPPLE_INCIDENT_2.jpg",
  redCowboyBoots: "https://static.wikia.nocookie.net/himym/images/1/14/Red-Boots.jpg",
  blueFrenchHorn: "https://static.wikia.nocookie.net/himym/images/5/53/Blue_french_horn.jpg",
  blueFrenchHornEnding: "https://static.wikia.nocookie.net/himym/images/d/d4/Bluefrenchhornend.jpg",
  robinSparkles: "https://static.wikia.nocookie.net/himym/images/2/25/Slap_bet_-_young_robin.png",
  slapBet: "https://static.wikia.nocookie.net/himym/images/f/f4/Slap_bet_pre_slap1.jpg"
};

const BASE_IMAGE_MANIFEST = [
  { id: "hero-booth", src: "", alt: "中文插画：MacLaren's 酒吧红色卡座和照片墙", credit: CREDIT, section: "hero", type: "scene", fallback: { motif: "booth", tone: "wine", title: "MacLaren's", tag: "红色卡座" } },
  { id: "hero-umbrella", src: "", alt: "中文插画：黄色雨伞靠在纽约街角", credit: CREDIT, section: "hero", type: "prop", fallback: { motif: "umbrella", tone: "mustard", title: "Yellow Umbrella", tag: "相遇之前" } },
  { id: "hero-horn", src: "", alt: "中文插画：蓝色法国号挂在公寓窗前", credit: CREDIT, section: "hero", type: "prop", fallback: { motif: "horn", tone: "blue", title: "Blue French Horn", tag: "绕回原点" } },
  { id: "hero-pineapple", src: "", alt: "中文插画：菠萝放在酒吧桌上", credit: CREDIT, section: "hero", type: "prop", fallback: { motif: "pineapple", tone: "green", title: "Pineapple", tag: "永远的疑案" } },
  { id: "hero-playbook", src: "", alt: "中文插画：Playbook 手册和领带", credit: CREDIT, section: "hero", type: "prop", fallback: { motif: "playbook", tone: "wine", title: "The Playbook", tag: "legen...等一下" } },
  { id: "hero-rooftop", src: "", alt: "中文插画：纽约屋顶派对和远处天际线", credit: CREDIT, section: "hero", type: "scene", fallback: { motif: "skyline", tone: "blue", title: "Rooftop", tag: "再喝一杯" } },
  { id: "hero-slap", src: "", alt: "中文插画：Slap Bet 倒计时和酒杯杯垫", credit: CREDIT, section: "hero", type: "memory", fallback: { motif: "slap", tone: "mint", title: "Slap Bet", tag: "友情的巴掌" } },
  { id: "hero-train", src: "", alt: "中文插画：Farhampton 站台和黄色雨伞", credit: CREDIT, section: "hero", type: "scene", fallback: { motif: "train", tone: "blue", title: "Farhampton", tag: "终于见面" } },

  { id: "character-ted", src: "", alt: "中文插画：Ted Mosby 的建筑蓝图和蓝色法国号", credit: CREDIT, section: "characters", type: "character", fallback: { motif: "architecture", tone: "blue", title: "Ted", tag: "建筑师 / 讲故事的人" } },
  { id: "character-robin", src: "", alt: "中文插画：Robin Scherbatsky 的新闻桌和加拿大元素", credit: CREDIT, section: "characters", type: "character", fallback: { motif: "news", tone: "green", title: "Robin", tag: "记者 / 不被定义" } },
  { id: "character-barney", src: "", alt: "中文插画：Barney Stinson 的西装和 Playbook", credit: CREDIT, section: "characters", type: "character", fallback: { motif: "suit", tone: "wine", title: "Barney", tag: "Suit Up" } },
  { id: "character-marshall", src: "", alt: "中文插画：Marshall Eriksen 的法槌和环保文件", credit: CREDIT, section: "characters", type: "character", fallback: { motif: "law", tone: "mint", title: "Marshall", tag: "律师 / 大只温柔" } },
  { id: "character-lily", src: "", alt: "中文插画：Lily Aldrin 的调色盘和课堂贴纸", credit: CREDIT, section: "characters", type: "character", fallback: { motif: "art", tone: "mustard", title: "Lily", tag: "画家 / 小队胶水" } },
  { id: "character-tracy", src: "", alt: "中文插画：Tracy McConnell 的贝斯和黄色雨伞", credit: CREDIT, section: "characters", type: "character", fallback: { motif: "music", tone: "blue", title: "Tracy", tag: "母亲 / 那把伞" } },

  { id: "s1-blue-horn", src: "", alt: "第一季视觉：蓝色法国号开启 Ted 和 Robin 的故事", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "horn", tone: "blue", title: "S1", tag: "法国号开场" } },
  { id: "s1-pineapple", src: "", alt: "第一季视觉：菠萝之谜和宿醉早晨", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "pineapple", tone: "green", title: "S1", tag: "菠萝之谜" } },
  { id: "s2-slap-bet", src: "", alt: "第二季视觉：Slap Bet 和五人组的赌约", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "slap", tone: "mint", title: "S2", tag: "Slap Bet" } },
  { id: "s2-wedding", src: "", alt: "第二季视觉：Marshall 和 Lily 婚礼的戒指", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "wedding", tone: "mustard", title: "S2", tag: "最稳的一对" } },
  { id: "s3-umbrella", src: "", alt: "第三季视觉：黄色雨伞第一次成为命运线索", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "umbrella", tone: "mustard", title: "S3", tag: "雨伞登场" } },
  { id: "s3-tattoo", src: "", alt: "第三季视觉：Ted 的蝴蝶纹身和冲动选择", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "tattoo", tone: "wine", title: "S3", tag: "蝴蝶纹身" } },
  { id: "s4-altar", src: "", alt: "第四季视觉：婚礼现场空下的位置", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "wedding", tone: "blue", title: "S4", tag: "被留在婚礼" } },
  { id: "s4-roof", src: "", alt: "第四季视觉：屋顶上的朋友与纽约夜色", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "skyline", tone: "green", title: "S4", tag: "纽约屋顶" } },
  { id: "s5-doppelgangers", src: "", alt: "第五季视觉：五人组寻找分身的剪影", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "doppelganger", tone: "mint", title: "S5", tag: "分身们" } },
  { id: "s5-playbook", src: "", alt: "第五季视觉：Barney 的 Playbook 打开在桌上", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "playbook", tone: "wine", title: "S5", tag: "套路手册" } },
  { id: "s6-arcadian", src: "", alt: "第六季视觉：Arcadian 建筑模型和城市规划线", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "architecture", tone: "green", title: "S6", tag: "Arcadian" } },
  { id: "s6-father", src: "", alt: "第六季视觉：旧照片和父亲记忆", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "oldphoto", tone: "mustard", title: "S6", tag: "迟来的父亲" } },
  { id: "s7-ducky-tie", src: "", alt: "第七季视觉：鸭子领带和赌约后果", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "ducky", tone: "mint", title: "S7", tag: "鸭子领带" } },
  { id: "s7-robin-barney", src: "", alt: "第七季视觉：Robin 和 Barney 的关系阴影", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "relationship", tone: "wine", title: "S7", tag: "靠近又错开" } },
  { id: "s8-farhampton", src: "", alt: "第八季视觉：Farhampton 站台出现黄色雨伞", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "train", tone: "blue", title: "S8", tag: "站台越来越近" } },
  { id: "s8-45-days", src: "", alt: "第八季视觉：四十五天倒计时和空酒杯", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "coaster", tone: "green", title: "S8", tag: "45 天" } },
  { id: "s9-wedding-weekend", src: "", alt: "第九季视觉：婚礼周末和酒店走廊", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "wedding", tone: "mustard", title: "S9", tag: "婚礼周末" } },
  { id: "s9-last-forever", src: "", alt: "第九季视觉：最后一集的蓝色法国号与窗户", credit: CREDIT, section: "timeline", type: "season", fallback: { motif: "window", tone: "blue", title: "S9", tag: "Last Forever" } },

  { id: "prop-umbrella", src: "", alt: "经典物件：黄色雨伞", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "umbrella", tone: "mustard", title: "黄色雨伞", tag: "命运有时很会藏" } },
  { id: "prop-horn", src: "", alt: "经典物件：蓝色法国号", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "horn", tone: "blue", title: "蓝色法国号", tag: "浪漫也可以很离谱" } },
  { id: "prop-playbook", src: "", alt: "经典物件：The Playbook", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "playbook", tone: "wine", title: "Playbook", tag: "翻开就是事故" } },
  { id: "prop-suit", src: "", alt: "经典物件：Barney 的西装", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "suit", tone: "wine", title: "西装", tag: "Suit up!" } },
  { id: "prop-slap", src: "", alt: "经典物件：Slap Bet 计数器", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "slap", tone: "mint", title: "Slap Bet", tag: "朋友之间的长期债务" } },
  { id: "prop-pineapple", src: "", alt: "经典物件：菠萝", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "pineapple", tone: "green", title: "菠萝", tag: "粉丝永远会问" } },
  { id: "prop-boots", src: "", alt: "经典物件：Ted 的红靴子", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "boots", tone: "wine", title: "红靴子", tag: "自信与灾难并存" } },
  { id: "prop-ducky", src: "", alt: "经典物件：鸭子领带", credit: CREDIT, section: "objects", type: "prop", fallback: { motif: "ducky", tone: "mint", title: "鸭子领带", tag: "愿赌服输" } },

  { id: "relation-ted-robin", src: "", alt: "关系拼贴：Ted 和 Robin 的蓝色法国号", credit: CREDIT, section: "relationships", type: "relationship", fallback: { motif: "relationship", tone: "blue", title: "Ted / Robin", tag: "绕不开的那个人" } },
  { id: "relation-marshall-lily", src: "", alt: "关系拼贴：Marshall 和 Lily 的婚戒与画笔", credit: CREDIT, section: "relationships", type: "relationship", fallback: { motif: "wedding", tone: "mustard", title: "Marshall / Lily", tag: "小队定海神针" } },
  { id: "relation-barney-robin", src: "", alt: "关系拼贴：Barney 和 Robin 的西装与新闻话筒", credit: CREDIT, section: "relationships", type: "relationship", fallback: { motif: "suit", tone: "wine", title: "Barney / Robin", tag: "两个不想承认的人" } },
  { id: "relation-ted-tracy", src: "", alt: "关系拼贴：Ted 和 Tracy 的黄色雨伞与贝斯", credit: CREDIT, section: "relationships", type: "relationship", fallback: { motif: "music", tone: "blue", title: "Ted / Tracy", tag: "终于不是错过" } },
  { id: "relation-five", src: "", alt: "关系拼贴：五人组围坐在酒吧卡座", credit: CREDIT, section: "relationships", type: "relationship", fallback: { motif: "group", tone: "green", title: "The Gang", tag: "那张桌子坐满了" } },

  { id: "quote-legendary", src: "", alt: "金句便签：Legendary", credit: CREDIT, section: "quotes", type: "quote", fallback: { motif: "quote", tone: "wine", title: "Legendary", tag: "等一下再说完" } },
  { id: "quote-2am", src: "", alt: "金句便签：凌晨两点之后没有好事", credit: CREDIT, section: "quotes", type: "quote", fallback: { motif: "coaster", tone: "green", title: "2 A.M.", tag: "别发那条消息" } },
  { id: "quote-kids", src: "", alt: "金句便签：孩子们，这就是故事开始的地方", credit: CREDIT, section: "quotes", type: "quote", fallback: { motif: "oldphoto", tone: "mustard", title: "Kids...", tag: "老爸又开始了" } },

  { id: "finale-farhampton", src: "", alt: "结局视觉：Farhampton 站台上黄色雨伞靠近", credit: CREDIT, section: "finale", type: "ending", fallback: { motif: "train", tone: "blue", title: "Farhampton", tag: "相遇终于发生" } },
  { id: "finale-window", src: "", alt: "结局视觉：公寓窗前再次出现蓝色法国号", credit: CREDIT, section: "finale", type: "ending", fallback: { motif: "window", tone: "blue", title: "Blue French Horn", tag: "争议留在窗下" } }
];

const REAL_IMAGE_OVERRIDES = {
  "hero-booth": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2451.jpg", alt: "TVMaze 海报：How I Met Your Mother 五人组主视觉", caption: "The Gang", credit: TVMAZE_CREDIT },
  "hero-umbrella": { src: fandomImages.farhamptonUmbrellaWide, alt: "Fandom 剧照：Farhampton 站台雨夜中的黄色雨伞", caption: "Yellow Umbrella", credit: FANDOM_CREDIT },
  "hero-horn": { src: fandomImages.blueFrenchHornEnding, alt: "Fandom 剧照：结局中公寓窗前的蓝色法国号", caption: "Blue French Horn", credit: FANDOM_CREDIT },
  "hero-pineapple": { src: fandomImages.pineappleBedside, alt: "Fandom 剧照：Ted 醒来后床边的菠萝", caption: "Pineapple Incident", credit: FANDOM_CREDIT },
  "hero-playbook": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/245194.jpg", alt: "TVMaze 剧照：The Playbook 中 Barney 的套路时刻", caption: "The Playbook", credit: TVMAZE_CREDIT },
  "hero-rooftop": { src: "https://static.tvmaze.com/uploads/images/original_untouched/97/244016.jpg", alt: "TVMaze 剧照：第四季 The Leap，Ted 的屋顶一跃", caption: "The Leap", credit: TVMAZE_CREDIT },
  "hero-slap": { src: fandomImages.robinSparkles, alt: "Fandom 剧照：Robin Sparkles 录像带是 Slap Bet 的导火索", caption: "Robin Sparkles", credit: FANDOM_CREDIT },
  "hero-train": { src: "https://static.tvmaze.com/uploads/images/original_untouched/101/253963.jpg", alt: "TVMaze 剧照：Last Forever 结局中的告别与回望", caption: "Last Forever", credit: TVMAZE_CREDIT },

  "character-ted": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2452.jpg", alt: "TVMaze 角色图：Ted Mosby", caption: "Ted Mosby", credit: TVMAZE_CREDIT },
  "character-robin": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2456.jpg", alt: "TVMaze 角色图：Robin Scherbatsky", caption: "Robin Scherbatsky", credit: TVMAZE_CREDIT },
  "character-barney": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2453.jpg", alt: "TVMaze 角色图：Barney Stinson", caption: "Barney Stinson", credit: TVMAZE_CREDIT },
  "character-marshall": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2455.jpg", alt: "TVMaze 角色图：Marshall Eriksen", caption: "Marshall Eriksen", credit: TVMAZE_CREDIT },
  "character-lily": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2454.jpg", alt: "TVMaze 角色图：Lily Aldrin", caption: "Lily Aldrin", credit: TVMAZE_CREDIT },
  "character-tracy": { src: "https://static.tvmaze.com/uploads/images/original_untouched/0/2458.jpg", alt: "TVMaze 角色图：Tracy McConnell / The Mother", caption: "The Mother", credit: TVMAZE_CREDIT },

  "s1-blue-horn": { src: fandomImages.blueFrenchHorn, alt: "Fandom 剧照：第一季蓝色法国号开启 Ted 和 Robin 的故事", caption: "Blue French Horn", credit: FANDOM_CREDIT },
  "s1-pineapple": { src: fandomImages.pineappleBedside, alt: "Fandom 剧照：第一季 The Pineapple Incident 中的床边菠萝", caption: "The Pineapple Incident", credit: FANDOM_CREDIT },
  "s2-slap-bet": { src: fandomImages.robinSparkles, alt: "Fandom 剧照：Robin Sparkles 录像带，Slap Bet 剧情核心线索", caption: "Robin Sparkles", credit: FANDOM_CREDIT },
  "s2-wedding": { src: "https://static.tvmaze.com/uploads/images/original_untouched/96/240332.jpg", alt: "TVMaze 剧照：第二季 Something Blue 婚礼集", caption: "Something Blue", credit: TVMAZE_CREDIT },
  "s3-umbrella": { src: fandomImages.yellowUmbrellaStreet, alt: "Fandom 剧照：黄色雨伞成为母亲线索", caption: "The Yellow Umbrella", credit: FANDOM_CREDIT },
  "s3-tattoo": { src: "https://static.tvmaze.com/uploads/images/original_untouched/136/341343.jpg", alt: "TVMaze 剧照：第三季 Wait for It，Ted 在分手后重新开始", caption: "Wait for It", credit: TVMAZE_CREDIT },
  "s4-altar": { src: "https://static.tvmaze.com/uploads/images/original_untouched/97/242927.jpg", alt: "TVMaze 剧照：第四季 Shelter Island，Ted 和 Stella 的婚礼转折", caption: "Shelter Island", credit: TVMAZE_CREDIT },
  "s4-roof": { src: "https://static.tvmaze.com/uploads/images/original_untouched/97/244016.jpg", alt: "TVMaze 剧照：第四季 The Leap，Ted 的屋顶一跃", caption: "The Leap", credit: TVMAZE_CREDIT },
  "s5-doppelgangers": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/245978.jpg", alt: "TVMaze 剧照：第五季 Doppelgangers，分身线收束", caption: "Doppelgangers", credit: TVMAZE_CREDIT },
  "s5-playbook": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/245194.jpg", alt: "TVMaze 剧照：第五季 The Playbook", caption: "The Playbook", credit: TVMAZE_CREDIT },
  "s6-arcadian": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/246587.jpg", alt: "TVMaze 剧照：第六季 Natural History，Arcadian 相关剧情", caption: "Natural History", credit: TVMAZE_CREDIT },
  "s6-father": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/246812.jpg", alt: "TVMaze 剧照：第六季 Last Words，Marshall 的父亲线", caption: "Last Words", credit: TVMAZE_CREDIT },
  "s7-ducky-tie": { src: "https://static.tvmaze.com/uploads/images/original_untouched/99/248332.jpg", alt: "TVMaze 剧照：第七季 Ducky Tie", caption: "Ducky Tie", credit: TVMAZE_CREDIT },
  "s7-robin-barney": { src: "https://static.tvmaze.com/uploads/images/original_untouched/99/248863.jpg", alt: "TVMaze 剧照：第七季 Tick Tick Tick，Robin 和 Barney 的关系转折", caption: "Tick Tick Tick...", credit: TVMAZE_CREDIT },
  "s8-farhampton": { src: fandomImages.farhamptonUmbrellaClose, alt: "Fandom 剧照：Farhampton 站台上 Tracy 与黄色雨伞", caption: "Farhampton", credit: FANDOM_CREDIT },
  "s8-45-days": { src: "https://static.tvmaze.com/uploads/images/original_untouched/100/251952.jpg", alt: "TVMaze 剧照：第八季 The Time Travelers，45 天独白所在集", caption: "The Time Travelers", credit: TVMAZE_CREDIT },
  "s9-wedding-weekend": { src: "https://static.tvmaze.com/uploads/images/original_untouched/100/252399.jpg", alt: "TVMaze 剧照：第九季 The Locket，婚礼周末开场", caption: "The Locket", credit: TVMAZE_CREDIT },
  "s9-last-forever": { src: "https://static.tvmaze.com/uploads/images/original_untouched/101/253950.jpg", alt: "TVMaze 剧照：第九季 Last Forever 结局上半", caption: "Last Forever", credit: TVMAZE_CREDIT },

  "relation-ted-robin": { src: "https://static.tvmaze.com/uploads/images/original_untouched/346/865704.jpg", alt: "TVMaze 剧照：Ted 和 Robin 的初遇", caption: "Ted / Robin", credit: TVMAZE_CREDIT },
  "relation-marshall-lily": { src: "https://static.tvmaze.com/uploads/images/original_untouched/96/240332.jpg", alt: "TVMaze 剧照：Marshall 和 Lily 的婚礼", caption: "Marshall / Lily", credit: TVMAZE_CREDIT },
  "relation-barney-robin": { src: "https://static.tvmaze.com/uploads/images/original_untouched/99/248863.jpg", alt: "TVMaze 剧照：Barney 和 Robin 的关系转折", caption: "Barney / Robin", credit: TVMAZE_CREDIT },
  "relation-ted-tracy": { src: fandomImages.farhamptonUmbrellaWide, alt: "Fandom 剧照：Ted 和 Tracy 在 Farhampton 站台被黄色雨伞连接", caption: "Ted / Tracy", credit: FANDOM_CREDIT },
  "relation-five": { src: "https://static.tvmaze.com/uploads/images/original_untouched/346/866033.jpg", alt: "TVMaze 剧照：五人组在早期季的酒吧与派对记忆", caption: "The Gang", credit: TVMAZE_CREDIT },

  "quote-legendary": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/245194.jpg", alt: "TVMaze 剧照：The Playbook 中 Barney 的 legendary 气场", caption: "Legen... dary", credit: TVMAZE_CREDIT },
  "quote-2am": { src: "https://static.tvmaze.com/uploads/images/original_untouched/135/339503.jpg", alt: "TVMaze 剧照：Nothing Good Happens After 2 A.M.", caption: "2 A.M.", credit: TVMAZE_CREDIT },
  "quote-kids": { src: "https://static.tvmaze.com/uploads/images/original_untouched/346/865704.jpg", alt: "TVMaze 剧照：Pilot 中故事开始的地方", caption: "Kids...", credit: TVMAZE_CREDIT },

  "prop-umbrella": { src: fandomImages.farhamptonUmbrellaClose, alt: "Fandom 剧照：黄色雨伞经典物件", caption: "Yellow Umbrella", credit: FANDOM_CREDIT },
  "prop-horn": { src: fandomImages.blueFrenchHorn, alt: "Fandom 剧照：蓝色法国号经典物件", caption: "Blue French Horn", credit: FANDOM_CREDIT },
  "prop-playbook": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/245194.jpg", alt: "TVMaze 剧照：Barney 手持 The Playbook", caption: "The Playbook", credit: TVMAZE_CREDIT },
  "prop-suit": { src: "https://static.tvmaze.com/uploads/images/original_untouched/98/245456.jpg", alt: "TVMaze 剧照：Barney 的西装形象", caption: "Suit up!", credit: TVMAZE_CREDIT },
  "prop-slap": { src: fandomImages.slapBet, alt: "Fandom 剧照：Slap Bet 巴掌前的倒计时", caption: "Slap Bet", credit: FANDOM_CREDIT },
  "prop-pineapple": { src: fandomImages.pineappleBedside, alt: "Fandom 剧照：菠萝事件里的床边菠萝", caption: "Pineapple Incident", credit: FANDOM_CREDIT },
  "prop-boots": { src: fandomImages.redCowboyBoots, alt: "Fandom 剧照：Ted 穿着红色牛仔靴", caption: "Red Cowboy Boots", credit: FANDOM_CREDIT },
  "prop-ducky": { src: "https://static.tvmaze.com/uploads/images/original_untouched/99/248332.jpg", alt: "TVMaze 剧照：第七季 Ducky Tie", caption: "Ducky Tie", credit: TVMAZE_CREDIT },

  "finale-farhampton": { src: fandomImages.farhamptonUmbrellaWide, alt: "Fandom 剧照：结局回忆中的 Farhampton 站台和黄色雨伞", caption: "Farhampton", credit: FANDOM_CREDIT },
  "finale-window": { src: fandomImages.blueFrenchHornEnding, alt: "Fandom 剧照：结局中故事回到蓝色法国号", caption: "Blue French Horn", credit: FANDOM_CREDIT }
};

export const imageManifest = BASE_IMAGE_MANIFEST.map((item) => ({
  ...item,
  ...(REAL_IMAGE_OVERRIDES[item.id] || {}),
  fallback: {
    ...item.fallback,
    ...(REAL_IMAGE_OVERRIDES[item.id]?.fallback || {})
  }
}));

export default imageManifest;
