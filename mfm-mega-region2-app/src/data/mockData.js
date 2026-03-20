// MFM Mega Region 2 USA — Mock Data (Updated v2)
// Prayer wall: fully anonymous | Directory: no pastors, location+email | Livestream sources

export const branches = [
  { id: 'b1', name: 'MFM Prayer City (HQ)', city: 'Houston', state: 'TX', phone: '(346) 414-5880', address: '6910 North Eldridge Pkwy, Houston TX 77041', email: 'prayercity@mfmmegaregion2.org', isHQ: true },
  { id: 'b2', name: 'MFM Dallas', city: 'Dallas', state: 'TX', phone: '(469) 353-3712', address: '306 N Greenville Ave, Richardson, TX 75081', email: 'mfmdallatexas@gmail.com' },
  { id: 'b3', name: 'MFM Grand Prairie', city: 'Grand Prairie', state: 'TX', phone: '(972) 555-0102', address: 'Grand Prairie, TX', email: null },
  { id: 'b4', name: 'MFM Arlington', city: 'Arlington', state: 'TX', phone: '(817) 555-0103', address: 'Arlington, TX', email: null },
  { id: 'b5', name: 'MFM Austin', city: 'Austin', state: 'TX', phone: '(512) 555-0104', address: 'Austin, TX', email: null },
  { id: 'b6', name: 'MFM San Antonio', city: 'San Antonio', state: 'TX', phone: '(210) 555-0105', address: 'San Antonio, TX', email: null },
  { id: 'b7', name: 'MFM Irving', city: 'Irving', state: 'TX', phone: '(972) 555-0106', address: 'Irving, TX', email: null },
  { id: 'b8', name: 'MFM Sugar Land', city: 'Sugar Land', state: 'TX', phone: '(281) 555-0107', address: 'Sugar Land, TX', email: null },
  { id: 'b9', name: 'MFM Pearland', city: 'Pearland', state: 'TX', phone: '(281) 555-0108', address: 'Pearland, TX', email: null },
  { id: 'b10', name: 'MFM NW Houston', city: 'Houston', state: 'TX', phone: '(713) 555-0109', address: 'NW Houston, TX', email: null },
  { id: 'b11', name: 'MFM Huntsville', city: 'Huntsville', state: 'TX', phone: '(936) 555-0110', address: 'Huntsville, TX', email: null },
  { id: 'b12', name: 'MFM Tampa', city: 'Tampa', state: 'FL', phone: '(813) 555-0201', address: 'Tampa, FL', email: null },
  { id: 'b13', name: 'MFM Orlando', city: 'Orlando', state: 'FL', phone: '(407) 555-0202', address: 'Orlando, FL', email: null },
  { id: 'b14', name: 'MFM Miami', city: 'Miami', state: 'FL', phone: '(305) 555-0203', address: 'Miami, FL', email: null },
  { id: 'b15', name: 'MFM Broward', city: 'Fort Lauderdale', state: 'FL', phone: '(954) 555-0204', address: 'Fort Lauderdale, FL', email: null },
  { id: 'b16', name: 'MFM Tallahassee', city: 'Tallahassee', state: 'FL', phone: '(850) 555-0205', address: 'Tallahassee, FL', email: null },
];

export const weeklyServices = [
  { id: 'ws1', title: 'Sunday Worship Service', day: 'Sunday', dayNum: 0, time: '9:00 AM - 11:30 AM', description: 'Main worship service with praise, worship, sermon, and prayer.', icon: 'sunny', color: '#D4A017', recurring: true },
  { id: 'ws2', title: 'Bible Study / Spiritual Clinic', day: 'Monday', dayNum: 1, time: '6:30 PM - 7:30 PM', description: 'In-depth Bible study and spiritual counseling.', icon: 'book', color: '#1565C0', recurring: true },
  { id: 'ws3', title: 'Manna Water Service', day: 'Wednesday', dayNum: 3, time: '6:30 PM - 8:00 PM', description: 'Revival and healing service. Bring water bottles for prayer.', icon: 'water', color: '#2E7D32', recurring: true },
  { id: 'ws4', title: 'Prayer Rain / Night Vigil', day: 'Friday', dayNum: 5, time: '11:00 PM - 2:00 AM', description: 'Intensive night prayer session.', icon: 'moon', color: '#6A0DAD', recurring: true, note: 'Monthly (check schedule)' },
];

export const specialEvents = [
  { id: 'se1', title: 'Power Must Change Hands (PMCH)', date: '2026-04-04', time: '8:00 AM - 12:00 PM', description: 'Flagship monthly spiritual warfare program led by Dr. D.K. Olukoya.', location: 'All Branches', type: 'pmch', color: '#E8530E', isGlobal: true, recurring: 'first_saturday' },
  { id: 'se2', title: 'Mega Region 2 Revival', date: '2026-04-18', time: '6:00 PM - 9:00 PM', description: 'Regional revival service with all Mega Region 2 branches.', location: 'MFM Prayer City, Houston', type: 'revival', color: '#6A0DAD', isGlobal: false },
  { id: 'se3', title: 'Youth Church Convention', date: '2026-05-09', time: '10:00 AM - 4:00 PM', description: 'Mega Region 2 Youth Church annual convention.', location: 'MFM Prayer City, Houston', type: 'youth', color: '#FF7A3D', isGlobal: false },
  { id: 'se4', title: 'Glorious Women Conference', date: '2026-05-16', time: '9:00 AM - 3:00 PM', description: "Women's Foundation conference.", location: 'MFM Prayer City, Houston', type: 'women', color: '#9B4DCA', isGlobal: false },
  { id: 'se5', title: 'Men of Valour Summit', date: '2026-06-06', time: '9:00 AM - 2:00 PM', description: "Bi-annual men's summit.", location: 'MFM Dallas', type: 'men', color: '#4A0778', isGlobal: false },
  { id: 'se6', title: '70 Days Fasting & Prayer', date: '2026-08-10', time: '6:00 AM - 6:00 PM', description: 'Annual 70-day fasting and prayer program.', location: 'All Branches', type: 'fasting', color: '#BF360C', isGlobal: true, recurring: 'annual' },
];

export const announcements = [
  { id: 'a1', title: '2026 Prophetic Declaration', body: '"My Year of Great Deliverance and Fresh Glory" — Genesis 45:7.', date: '2026-01-01', priority: 'high', author: 'Dr. D.K. Olukoya' },
  { id: 'a2', title: 'Foundational Class Enrollment Open', body: 'New members: class begins April 13th at all branches.', date: '2026-03-15', priority: 'medium', author: 'Mega Region 2 Admin' },
  { id: 'a3', title: 'Easter Celebration & Baptism', body: 'Joint Easter celebration April 5th with water baptism by immersion.', date: '2026-03-18', priority: 'high', author: 'Mega Region 2 Leadership' },
];

export const devotionals = [
  { id: 'd1', date: '2026-03-20', title: 'Breaking Chains of Limitation', bibleReading: 'Isaiah 43:18-21', verseOfDay: '"Behold, I will do a new thing; now it shall spring forth; shall ye not know it?" — Isaiah 43:19', reflection: 'The God of MFM is a God of new things. Every chain of limitation placed upon your destiny is broken today in the name of Jesus.', prayerPoints: ['O Lord, break every chain of limitation in my life, in the name of Jesus.', 'Every power assigned to keep me stagnant, be destroyed by fire, in the name of Jesus.', 'I receive fresh fire for my destiny, in the name of Jesus.', 'Every wilderness experience, receive the rivers of God, in the name of Jesus.', 'O God arise and do a new thing in my family, career, and ministry, in the name of Jesus.', 'Every satanic padlock upon my breakthroughs, break by fire, in the name of Jesus.', 'I decree: this is my year of Great Deliverance and Fresh Glory, in the name of Jesus.'], category: 'deliverance' },
  { id: 'd2', date: '2026-03-19', title: 'Fire on the Altar', bibleReading: 'Leviticus 6:12-13', verseOfDay: '"The fire shall ever be burning upon the altar; it shall never go out." — Leviticus 6:13', reflection: 'The fire of God must never go out in your life. Fan the flame today!', prayerPoints: ['O Lord, reignite the fire of the Holy Ghost in my life, in the name of Jesus.', 'Every spirit of prayerlessness, I bind you and cast you out, in the name of Jesus.', 'Let the altar of God in my life never go cold, in the name of Jesus.', 'Fire of God, consume every strange fire in my household, in the name of Jesus.', 'I receive fresh anointing for prayer and spiritual warfare, in the name of Jesus.'], category: 'spiritual_warfare' },
];

export const samplePrayerRequests = [
  { id: 'pr1', request: "Please pray for my daughter's visa interview next week. We believe God for favor.", date: '2026-03-19', prayerCount: 24, category: 'favor' },
  { id: 'pr2', request: 'Pray for healing from a chronic illness. 3 years and trusting God.', date: '2026-03-18', prayerCount: 47, category: 'healing' },
  { id: 'pr3', request: 'Job breakthrough — graduated 8 months ago. God is faithful.', date: '2026-03-17', prayerCount: 35, category: 'breakthrough' },
  { id: 'pr4', request: 'Agree with me in prayer for my marriage restoration. God is able!', date: '2026-03-16', prayerCount: 52, category: 'family' },
  { id: 'pr5', request: 'Pray against household wickedness affecting my family. Fire answer!', date: '2026-03-15', prayerCount: 41, category: 'deliverance' },
];

export const prayerCategories = [
  { id: 'cat1', name: 'Healing', icon: 'medkit', color: '#2E7D32' },
  { id: 'cat2', name: 'Deliverance', icon: 'flash', color: '#E8530E' },
  { id: 'cat3', name: 'Breakthrough', icon: 'trending-up', color: '#D4A017' },
  { id: 'cat4', name: 'Family', icon: 'people', color: '#6A0DAD' },
  { id: 'cat5', name: 'Favor', icon: 'star', color: '#FF7A3D' },
  { id: 'cat6', name: 'Protection', icon: 'shield-checkmark', color: '#1565C0' },
  { id: 'cat7', name: 'Provision', icon: 'wallet', color: '#4A0778' },
  { id: 'cat8', name: 'Thanksgiving', icon: 'heart', color: '#C62828' },
];

export const departments = [
  { id: 'dept1', name: 'Prayer Warriors', icon: 'shield', description: 'Spiritual warfare and intercession' },
  { id: 'dept2', name: 'Choir', icon: 'musical-notes', description: 'Praise and worship ministry' },
  { id: 'dept3', name: 'Ushering', icon: 'hand-left', description: 'Hospitality and service' },
  { id: 'dept4', name: 'Evangelism', icon: 'megaphone', description: 'Outreach and soul winning' },
  { id: 'dept5', name: 'Youth Church', icon: 'people', description: 'Young adult ministry' },
  { id: 'dept6', name: "Women's Foundation", icon: 'flower', description: 'Glorious Women ministry' },
  { id: 'dept7', name: 'Men of Valour', icon: 'fitness', description: "Men's empowerment ministry" },
  { id: 'dept8', name: 'Children Church', icon: 'happy', description: "Children's ministry" },
  { id: 'dept9', name: 'House Fellowship', icon: 'home', description: 'Neighborhood cell groups' },
  { id: 'dept10', name: 'Technical', icon: 'settings', description: 'Media and tech support' },
];

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@mfmmegaregion2usa';

export const livestreamSources = [
  { id: 'ls1', name: 'MFM Mega Region 2 USA', description: 'Official regional channel — services, revivals, specials.', youtubeUrl: 'https://www.youtube.com/@mfmmegaregion2usa', isPrimary: true, type: 'regional' },
  { id: 'ls2', name: 'MFM International HQ', description: 'Dr. D.K. Olukoya — PMCH, Manna Water, Prayer Rain.', youtubeUrl: 'https://www.youtube.com/@MFMtv', isPrimary: false, type: 'global' },
  { id: 'ls3', name: 'MFM America', description: 'MFM America HQ — US-wide services and events.', youtubeUrl: 'https://www.youtube.com/@MFMAmerica', isPrimary: false, type: 'national' },
  { id: 'ls4', name: 'MFM Dallas', description: 'MFM Dallas branch services and programs.', youtubeUrl: 'https://www.youtube.com/@MFMDallas', isPrimary: false, type: 'branch' },
];

export const livestreamSchedule = [
  { day: 'Sunday', program: 'Worship Service', time: '9:00 AM CST', source: 'MFM Mega Region 2' },
  { day: 'Wednesday', program: 'Manna Water (via HQ)', time: '10:30 AM CST', source: 'MFM Int\'l HQ' },
  { day: 'Friday', program: 'Prayer Rain (via HQ)', time: '2:00 PM CST', source: 'MFM Int\'l HQ' },
  { day: '1st Saturday', program: 'Power Must Change Hands', time: '1:00 AM CST', source: 'MFM Int\'l HQ' },
  { day: 'Saturday', program: 'Great Physician Hour', time: '3:30 PM CST', source: 'MFM Int\'l HQ' },
];
