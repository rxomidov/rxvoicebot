require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

// Voice categories with descriptions added
const voiceCategories = {
//   greetings: {
//     name: '👋 Salomlar',
//     voices: {
//       salom: { 
//         name: 'Salom', 
//         file: './voices/greetings/salom.ogg',
//         description: 'Salom aytish',
//         file_id: null
//       },
//       xayr: { 
//         name: 'Xayr', 
//         file: './voices/greetings/xayr.ogg',
//         description: 'Xayrlashuv',
//         file_id: null
//       },
//       assalomu: { 
//         name: 'Assalomu alaykum', 
//         file: './voices/greetings/assalomu.ogg',
//         description: 'Islomiy salom',
//         file_id: null
//       }
//     }
//   },
//   thanks: {
//     name: '🙏 Minnatdorchilik',
//     voices: {
//       rahmat: { 
//         name: 'Rahmat', 
//         file: './voices/thanks/rahmat.ogg',
//         description: 'Minnatdorchilik',
//         file_id: null
//       },
//       tashakkur: { 
//         name: 'Tashakkur', 
//         file: './voices/thanks/tashakkur.ogg',
//         description: 'Rasmiy rahmat',
//         file_id: null
//       }
//     }
//   },
  musicsounds: {
    name: '🎵 Music Sounds',
    voices: {
      thegodfather: { 
        name: 'The Godfather', 
        file: './voices/emotions/the_godfather.mp3',
        description: 'the_godfather',
        file_id: null
      },
      goodbadandugly: { 
        name: 'Good, bad and ugly', 
        file: './voices/emotions/good_bad_and_ugly.mp3',
        description: 'good_bad_and_ugly',
        file_id: null
      },
      robertb: { 
        name: 'Directed by Robert B', 
        file: './voices/emotions/robertb.mp3',
        description: 'robertb',
        file_id: null
      },
      dexter: { 
        name: 'Dexter Theme', 
        file: './voices/emotions/dexter.mp3',
        description: 'dexter',
        file_id: null
      },
      snoppDog: { 
        name: 'Snopp Dog', 
        file: './voices/emotions/snoppdog.mp3',
        description: 'snoppdog',
        file_id: null
      },
      putin: { 
        name: 'Putin', 
        file: './voices/emotions/putin.mp3',
        description: 'putin',
        file_id: null
      },
    }
  },
  memesounds: {
    name: '😊 Meme Sounds',
    voices: {
      fahhhhh: { 
        name: 'Fahhhhh', 
        file: './voices/emotions/fahhhhh.mp3',
        description: 'Fahhhhh',
        file_id: null
      },
      emotionaldamage: { 
        name: 'Emotional Damage', 
        file: './voices/emotions/emotionaldamage.mp3',
        description: 'Emotional Damage',
        file_id: null
      },
      instagramthud: { 
        name: 'Instagram Thud', 
        file: './voices/emotions/instagramthud.mp3',
        description: 'instagramthud',
        file_id: null
      },
      spidermanmeme: { 
        name: 'Spider-Man Meme', 
        file: './voices/emotions/spidermanmeme.mp3',
        description: 'spidermanmeme',
        file_id: null
      },
      catlaughmeme: { 
        name: 'Cat Laugh Meme', 
        file: './voices/emotions/catlaughmeme.mp3',
        description: 'catlaughmeme',
        file_id: null
      },
      loading: { 
        name: 'Loading', 
        file: './voices/emotions/loading.mp3',
        description: 'loading',
        file_id: null
      },
      sadviolin: { 
        name: 'Sad Violin', 
        file: './voices/emotions/sadviolin.mp3',
        description: 'sadviolin',
        file_id: null
      },
      sad_hamster: { 
        name: 'Sad Hamster', 
        file: './voices/emotions/sad_hamster.mp3',
        description: 'sad_hamster',
        file_id: null
      },
    }
  }
};

// User statistics
const userStats = {};

// Helper function to check if file exists
function fileExists(filePath) {
  try {const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(TOKEN, { polling: true });

// MUHIM: Inline mode uchun file_id kerak!
// Har bir ovozni birinchi marta yuboring, file_id avtomatik saqlanadi
const voiceCategories = {
//   greetings: {
//     name: '👋 Salomlar',
//     voices: {
//       salom: { 
//         name: 'Salom', 
//         file: './voices/greetings/salom.ogg',
//         description: 'Salom aytish',
//         file_id: null
//       },
//       xayr: { 
//         name: 'Xayr', 
//         file: './voices/greetings/xayr.ogg',
//         description: 'Xayrlashuv',
//         file_id: null
//       },
//       assalomu: { 
//         name: 'Assalomu alaykum', 
//         file: './voices/greetings/assalomu.ogg',
//         description: 'Islomiy salom',
//         file_id: null
//       }
//     }
//   },
//   thanks: {
//     name: '🙏 Minnatdorchilik',
//     voices: {
//       rahmat: { 
//         name: 'Rahmat', 
//         file: './voices/thanks/rahmat.ogg',
//         description: 'Minnatdorchilik',
//         file_id: null
//       },
//       tashakkur: { 
//         name: 'Tashakkur', 
//         file: './voices/thanks/tashakkur.ogg',
//         description: 'Rasmiy rahmat',
//         file_id: null
//       }
//     }
//   },
  musicsounds: {
    name: '🎵 Music Sounds',
    voices: {
      thegodfather: { 
        name: 'The Godfather', 
        file: './voices/emotions/the_godfather.mp3',
        description: 'the_godfather',
        file_id: null
      },
      goodbadandugly: { 
        name: 'Good, bad and ugly', 
        file: './voices/emotions/good_bad_and_ugly.mp3',
        description: 'good_bad_and_ugly',
        file_id: null
      },
      robertb: { 
        name: 'Directed by Robert B', 
        file: './voices/emotions/robertb.mp3',
        description: 'robertb',
        file_id: null
      },
      dexter: { 
        name: 'Dexter Theme', 
        file: './voices/emotions/dexter.mp3',
        description: 'dexter',
        file_id: null
      },
      snoppDog: { 
        name: 'Snopp Dog', 
        file: './voices/emotions/snoppdog.mp3',
        description: 'snoppdog',
        file_id: null
      },
      putin: { 
        name: 'Putin', 
        file: './voices/emotions/putin.mp3',
        description: 'putin',
        file_id: null
      },
    }
  },
  memesounds: {
    name: '😊 Meme Sounds',
    voices: {
      fahhhhh: { 
        name: 'Fahhhhh', 
        file: './voices/emotions/fahhhhh.mp3',
        description: 'Fahhhhh',
        file_id: null
      },
      emotionaldamage: { 
        name: 'Emotional Damage', 
        file: './voices/emotions/emotionaldamage.mp3',
        description: 'Emotional Damage',
        file_id: null
      },
      instagramthud: { 
        name: 'Instagram Thud', 
        file: './voices/emotions/instagramthud.mp3',
        description: 'instagramthud',
        file_id: null
      },
      spidermanmeme: { 
        name: 'Spider-Man Meme', 
        file: './voices/emotions/spidermanmeme.mp3',
        description: 'spidermanmeme',
        file_id: null
      },
      catlaughmeme: { 
        name: 'Cat Laugh Meme', 
        file: './voices/emotions/catlaughmeme.mp3',
        description: 'catlaughmeme',
        file_id: null
      },
      loading: { 
        name: 'Loading', 
        file: './voices/emotions/loading.mp3',
        description: 'loading',
        file_id: null
      },
      sadviolin: { 
        name: 'Sad Violin', 
        file: './voices/emotions/sadviolin.mp3',
        description: 'sadviolin',
        file_id: null
      },
      sad_hamster: { 
        name: 'Sad Hamster', 
        file: './voices/emotions/sad_hamster.mp3',
        description: 'sad_hamster',
        file_id: null
      },
    }
  }
};

const userStats = {};

// File mavjudligini tekshirish
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Barcha ovozlarni olish
function getAllVoices() {
  const allVoices = {};
  
  Object.keys(voiceCategories).forEach(categoryKey => {
    const category = voiceCategories[categoryKey];
    Object.keys(category.voices).forEach(voiceKey => {
      const uniqueKey = `${categoryKey}_${voiceKey}`;
      allVoices[uniqueKey] = {
        ...category.voices[voiceKey],
        category: categoryKey,
        categoryName: category.name,
        voiceKey: voiceKey
      };
    });
  });
  
  return allVoices;
}

// File_id ni saqlash
function saveFileId(category, voiceKey, fileId) {
  if (voiceCategories[category]?.voices[voiceKey]) {
    voiceCategories[category].voices[voiceKey].file_id = fileId;
    console.log(`✅ File ID saqlandi: ${category}/${voiceKey} -> ${fileId.substring(0, 20)}...`);
  }
}

// Asosiy menyu
function showMainMenu(chatId) {
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        ...Object.keys(voiceCategories).map(key => ([
          { text: voiceCategories[key].name, callback_data: `cat_${key}` }
        ])),
        [
          { text: '🔍 Qidirish', callback_data: 'search_prompt' },
          { text: '📊 Statistika', callback_data: 'stats' }
        ],
        [
          { text: 'ℹ️ Inline Yordam', callback_data: 'inline_help' },
          { text: '⚙️ Setup', callback_data: 'setup_help' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, '🎤 *Ovozli Xabarlar Boti*\n\nKategoriyani tanlang:', {
    parse_mode: 'Markdown',
    ...keyboard
  });
}

// Kategoriya ovozlarini ko'rsatish
function showCategoryVoices(chatId, category) {
  const categoryData = voiceCategories[category];
  
  if (!categoryData) {
    bot.sendMessage(chatId, '❌ Kategoriya topilmadi');
    return;
  }

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        ...Object.keys(categoryData.voices).map(key => {
          const voice = categoryData.voices[key];
          const status = voice.file_id ? '✅' : '⚠️';
          return [{
            text: `${status} ${voice.name}`, 
            callback_data: `voice_${category}_${key}` 
          }];
        }),
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  const message = `${categoryData.name}\n\n*Ovozni tanlang:*\n\n` +
    `✅ - Inline modeda ishlaydi\n` +
    `⚠️ - Faqat botda ishlaydi (file_id yo'q)`;

  bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    ...keyboard
  });
}

// Ovoz yuborish
async function sendVoiceMessage(chatId, category, voiceKey, userId) {
  try {
    const voice = voiceCategories[category]?.voices[voiceKey];
    
    if (!voice) {
      bot.sendMessage(chatId, '❌ Ovoz topilmadi');
      return;
    }

    // File_id mavjud bo'lsa uni ishlatamiz
    const voiceFile = voice.file_id || voice.file;

    if (!voice.file_id && !fileExists(voice.file)) {
      bot.sendMessage(chatId, `❌ Fayl topilmadi: ${voice.name}\n\nPath: ${voice.file}`);
      return;
    }

    // Ovoz yuborish
    const sentMessage = await bot.sendVoice(chatId, voiceFile, {
      caption: `🎤 ${voice.name}`
    });

    // File_id ni saqlash
    if (sentMessage.voice?.file_id && !voice.file_id) {
      saveFileId(category, voiceKey, sentMessage.voice.file_id);
    }

    // Statistika
    updateUserStats(userId);

  } catch (error) {
    console.error('Ovoz yuborishda xatolik:', error.message);
    bot.sendMessage(chatId, '❌ Ovoz yuborishda xatolik yuz berdi');
  }
}

// Statistika yangilash
function updateUserStats(userId) {
  if (!userStats[userId]) {
    userStats[userId] = { count: 0, lastUsed: null };
  }
  userStats[userId].count++;
  userStats[userId].lastUsed = new Date();
}

// Statistika ko'rsatish
function showUserStats(chatId, userId) {
  const stats = userStats[userId] || { count: 0 };
  
  const message = `📊 *Sizning statistikangiz:*\n\n` +
    `• Yuborilgan ovozlar: ${stats.count} ta\n` +
    (stats.lastUsed ? `• Oxirgi: ${stats.lastUsed.toLocaleTimeString('uz-UZ')}` : '');
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...keyboard });
}

// Inline yordam
function showInlineHelp(chatId) {
  const botUsername = 'YourBotUsername'; // O'ZGARTIRING!
  
  const helpText = `
🎯 *Inline Mode Qo'llanmasi*

*Inline mode nima?*
Chatda \`@${botUsername} ovoz\` deb yozib ovoz yuborish.

*Qanday ishlaydi?*
1️⃣ Chatni oching (guruh/shaxsiy)
2️⃣ \`@${botUsername}\` deb yozing
3️⃣ Ovoz nomini kiriting
4️⃣ Tanlang va yuboring!

*Misollar:*
• \`@${botUsername} salom\`
• \`@${botUsername} rahmat\`
• \`@${botUsername}\` - barcha

⚠️ *MUHIM:* Inline mode uchun har bir ovozning file_id bo'lishi kerak!

Setup qo'llanmasi: /setup
  `.trim();

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '⚙️ Setup', callback_data: 'setup_help' }],
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown', ...keyboard });
}

// Setup yordam
function showSetupHelp(chatId) {
  const helpText = `
⚙️ *Inline Mode Setup*

*Muammo:*
Inline mode HTTP URL talab qiladi, lekin bizda mahalliy fayllar bor.

*Yechim:*
Har bir ovozni botga bir marta yuboring, file_id avtomatik saqlanadi!

*Qadamlar:*

1️⃣ Kategoriyani oching
2️⃣ Har bir ovozni bosing
3️⃣ Bot ovozni yuboradi va file_id saqlaydi
4️⃣ ✅ belgisi paydo bo'ladi
5️⃣ Endi inline modeda ishlaydi!

*Tekshirish:*
Kategoriyani oching:
• ✅ - Inline ishlaydi
• ⚠️ - Hali yuborilmagan

*Status:*
  `.trim();

  // File_id statistikasi
  let total = 0;
  let cached = 0;
  
  Object.keys(voiceCategories).forEach(catKey => {
    const cat = voiceCategories[catKey];
    Object.keys(cat.voices).forEach(voiceKey => {
      total++;
      if (cat.voices[voiceKey].file_id) cached++;
    });
  });

  const statusText = `${cached}/${total} ovoz tayyor (${Math.round(cached/total*100)}%)`;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔄 Barcha Ovozlarni Yuklash', callback_data: 'cache_all' }],
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, helpText + '\n\n' + statusText, { 
    parse_mode: 'Markdown', 
    ...keyboard 
  });
}

// Barcha ovozlarni yuklash (file_id olish uchun)
async function cacheAllVoices(chatId) {
  bot.sendMessage(chatId, '🔄 Barcha ovozlarni yuklamoqda...\n\nBir oz kuting...');
  
  let cached = 0;
  let errors = 0;
  
  for (const catKey of Object.keys(voiceCategories)) {
    const cat = voiceCategories[catKey];
    for (const voiceKey of Object.keys(cat.voices)) {
      const voice = cat.voices[voiceKey];
      
      if (!voice.file_id && fileExists(voice.file)) {
        try {
          const msg = await bot.sendVoice(chatId, voice.file, {
            caption: `🔄 ${voice.name} yuklanmoqda...`
          });
          
          if (msg.voice?.file_id) {
            saveFileId(catKey, voiceKey, msg.voice.file_id);
            cached++;
            await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
          }
        } catch (error) {
          console.error(`Xatolik: ${voice.name}`, error.message);
          errors++;
        }
      }
    }
  }
  
  bot.sendMessage(chatId, 
    `✅ *Tayyor!*\n\n` +
    `• Yuklandi: ${cached} ta\n` +
    `• Xatolar: ${errors} ta\n\n` +
    `Endi inline mode ishlaydi!`,
    { parse_mode: 'Markdown' }
  );
}

// Qidirish
function searchVoices(chatId, query) {
  const allVoices = getAllVoices();
  const searchTerm = query.toLowerCase().trim();

  const results = Object.entries(allVoices).filter(([key, voice]) => {
    const name = (voice.name || '').toLowerCase();
    const desc = (voice.description || '').toLowerCase();
    
    return name.includes(searchTerm) || desc.includes(searchTerm);
  });

  if (results.length === 0) {
    bot.sendMessage(chatId, `❌ "${query}" topilmadi`, {
      reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Orqaga', callback_data: 'back_main' }]]
      }
    });
    return;
  }

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        ...results.map(([key, voice]) => {
          const [cat, vKey] = key.split('_');
          const status = voice.file_id ? '✅' : '⚠️';
          return [{
            text: `${status} ${voice.name}`,
            callback_data: `voice_${cat}_${vKey}`
          }];
        }),
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, `🔍 "${query}"\n\n${results.length} ta topildi:`, keyboard);
}

// ==================== INLINE QUERY ====================

bot.on('inline_query', async (query) => {
  const queryText = (query.query || '').toLowerCase().trim();
  const allVoices = getAllVoices();

  try {
    let results = [];

    // Faqat file_id mavjud ovozlarni olish
    const availableVoices = Object.entries(allVoices).filter(([key, voice]) => {
      return voice.file_id !== null && voice.file_id !== undefined;
    });

    if (availableVoices.length === 0) {
      // File_id yo'q bo'lsa, botga xabar
      await bot.answerInlineQuery(query.id, [], {
        cache_time: 0,
        switch_pm_text: "⚠️ Inline mode sozlash kerak",
        switch_pm_parameter: "setup"
      });
      return;
    }

    // Qidirish
    let filtered = availableVoices;
    
    if (queryText !== '') {
      filtered = availableVoices.filter(([key, voice]) => {
        const name = (voice.name || '').toLowerCase();
        const desc = (voice.description || '').toLowerCase();
        return name.includes(queryText) || desc.includes(queryText);
      });
    }

    // Natijalarni tayyorlash
    results = filtered.slice(0, 50).map(([key, voice]) => ({
      type: 'voice',
      id: key,
      voice_file_id: voice.file_id,
      title: voice.name,
      caption: `🎤 ${voice.name}`
    }));

    await bot.answerInlineQuery(query.id, results, {
      cache_time: 300,
      is_personal: false,
      switch_pm_text: results.length === 0 ? "❌ Topilmadi" : "Bot sozlamalari",
      switch_pm_parameter: results.length === 0 ? "search" : "start"
    });

    console.log(`📥 Inline: "${queryText}" → ${results.length} natija`);

  } catch (error) {
    console.error('Inline xatolik:', error.message);
    
    await bot.answerInlineQuery(query.id, [], {
      cache_time: 0,
      switch_pm_text: "❌ Xatolik yuz berdi",
      switch_pm_parameter: "error"
    });
  }
});

// Inline natija tanlandi
bot.on('chosen_inline_result', (result) => {
  console.log(`✅ Inline tanlandi: ${result.result_id}`);
  updateUserStats(result.from.id);
});

// ==================== COMMANDS ====================

bot.onText(/\/start(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1].trim();
  
  if (param === 'setup') {
    showSetupHelp(chatId);
  } else {
    const userName = msg.from.first_name || 'Foydalanuvchi';
    
    bot.sendMessage(
      chatId,
      `👋 Salom, *${userName}*!\n\n` +
      `🎤 Ovozli xabarlar boti\n\n` +
      `*2 usul:*\n` +
      `1️⃣ Menyudan tanlash\n` +
      `2️⃣ Chatda @botusername yozish`,
      { parse_mode: 'Markdown' }
    ).then(() => showMainMenu(chatId));
  }
});

bot.onText(/\/help/, (msg) => {
  showInlineHelp(msg.chat.id);
});

bot.onText(/\/setup/, (msg) => {
  showSetupHelp(msg.chat.id);
});

bot.onText(/\/search (.+)/, (msg, match) => {
  searchVoices(msg.chat.id, match[1]);
});

bot.onText(/\/stats/, (msg) => {
  showUserStats(msg.chat.id, msg.from.id);
});

bot.onText(/\/cache/, async (msg) => {
  if (msg.from.id.toString() === 'YOUR_ADMIN_ID') { // Admin ID
    await cacheAllVoices(msg.chat.id);
  } else {
    bot.sendMessage(msg.chat.id, '❌ Faqat admin');
  }
});

// ==================== CALLBACKS ====================

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  try {
    if (data.startsWith('cat_')) {
      showCategoryVoices(chatId, data.replace('cat_', ''));
      bot.answerCallbackQuery(query.id);
    }
    else if (data.startsWith('voice_')) {
      const parts = data.split('_');
      const cat = parts[1];
      const vKey = parts.slice(2).join('_');
      await sendVoiceMessage(chatId, cat, vKey, userId);
      bot.answerCallbackQuery(query.id, { text: '✅' });
    }
    else if (data === 'back_main') {
      showMainMenu(chatId);
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'stats') {
      showUserStats(chatId, userId);
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'search_prompt') {
      bot.sendMessage(chatId, '🔍 /search <ovoz nomi>');
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'inline_help') {
      showInlineHelp(chatId);
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'setup_help') {
      showSetupHelp(chatId);
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'cache_all') {
      bot.answerCallbackQuery(query.id, { text: 'Boshlanmoqda...' });
      await cacheAllVoices(chatId);
    }
  } catch (error) {
    console.error('Callback xatolik:', error.message);
    bot.answerCallbackQuery(query.id, { text: '❌' });
  }
});

// ==================== ERRORS ====================

bot.on('polling_error', (error) => {
  console.error('Polling:', error.message);
});

// ==================== START ====================

console.log('🤖 Bot ishga tushdi!\n');

// Fayllarni tekshirish
let total = 0;
let missing = 0;
let cached = 0;

Object.keys(voiceCategories).forEach(catKey => {
  const cat = voiceCategories[catKey];
  Object.keys(cat.voices).forEach(vKey => {
    const voice = cat.voices[vKey];
    total++;
    if (!fileExists(voice.file)) {
      console.log(`❌ Fayl yo'q: ${voice.file}`);
      missing++;
    }
    if (voice.file_id) cached++;
  });
});

console.log(`\n📊 Status:`);
console.log(`• Jami ovozlar: ${total}`);
console.log(`• File_id mavjud: ${cached} (${Math.round(cached/total*100)}%)`);
console.log(`• Fayllar yo'q: ${missing}`);

if (cached === 0) {
  console.log(`\n⚠️  INLINE MODE ISHLAMAYDI!`);
  console.log(`\nYechim:`);
  console.log(`1. Botni private chatda oching`);
  console.log(`2. Har bir kategoriyadan ovoz yuboring`);
  console.log(`3. Yoki /cache buyrug'ini ishlating (admin)`);
  console.log(`4. File_id avtomatik saqlanadi`);
  console.log(`5. Keyin inline mode ishlaydi!\n`);
} else if (cached < total) {
  console.log(`\n⚠️  ${total - cached} ta ovoz inline modeda ishlamaydi`);
  console.log(`Ularni botda bir marta yuboring.\n`);
} else {
  console.log(`\n✅ Barcha ovozlar inline modeda ishlaydi!\n`);
}

console.log('Ctrl+C - to\'xtatish\n');

    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Get all voices (flat structure for search)
function getAllVoices() {
  const allVoices = {};
  
  Object.keys(voiceCategories).forEach(categoryKey => {
    const category = voiceCategories[categoryKey];
    Object.keys(category.voices).forEach(voiceKey => {
      const uniqueKey = `${categoryKey}_${voiceKey}`;
      allVoices[uniqueKey] = {
        ...category.voices[voiceKey],
        category: categoryKey,
        categoryName: category.name,
        voiceKey: voiceKey
      };
    });
  });
  
  return allVoices;
}

// Save file_id
function saveFileId(category, voiceKey, fileId) {
  if (voiceCategories[category]?.voices[voiceKey]) {
    voiceCategories[category].voices[voiceKey].file_id = fileId;
    console.log(`✅ File ID saqlandi: ${category}/${voiceKey}`);
  }
}

// Main menu
function showMainMenu(chatId) {
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        ...Object.keys(voiceCategories).map(key => ([
          { text: voiceCategories[key].name, callback_data: `cat_${key}` }
        ])),
        [
          { text: '🔍 Qidirish', callback_data: 'search_prompt' },
          { text: '📊 Statistika', callback_data: 'stats' }
        ],
        [
          { text: 'ℹ️ Inline Mode', callback_data: 'inline_help' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, '🎤 *Ovozli Xabarlar Boti*\n\nKategoriyani tanlang:', {
    parse_mode: 'Markdown',
    ...keyboard
  });
}

// Show category voices
function showCategoryVoices(chatId, category) {
  const categoryData = voiceCategories[category];
  
  if (!categoryData) {
    bot.sendMessage(chatId, '❌ Kategoriya topilmadi');
    return;
  }

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        ...Object.keys(categoryData.voices).map(key => ([
          { 
            text: `🎤 ${categoryData.voices[key].name}`, 
            callback_data: `voice_${category}_${key}` 
          }
        ])),
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, `${categoryData.name}\n\n*Ovozni tanlang:*`, {
    parse_mode: 'Markdown',
    ...keyboard
  });
}

// Send voice message
async function sendVoiceMessage(chatId, category, voiceKey, userId) {
  try {
    const voice = voiceCategories[category]?.voices[voiceKey];
    
    if (!voice) {
      bot.sendMessage(chatId, '❌ Ovoz topilmadi');
      return;
    }

    // Use file_id if available, otherwise use file path
    const voiceFile = voice.file_id || voice.file;

    if (!voice.file_id && !fileExists(voice.file)) {
      bot.sendMessage(chatId, `❌ Fayl topilmadi: ${voice.name}`);
      return;
    }

    // Send voice
    const sentMessage = await bot.sendVoice(chatId, voiceFile, {
    //   caption: `🎤 ${voice.name}`
    });

    // Save file_id for future use
    if (sentMessage.voice?.file_id && !voice.file_id) {
      saveFileId(category, voiceKey, sentMessage.voice.file_id);
    }

    // Update stats
    updateUserStats(userId);

  } catch (error) {
    console.error('Voice yuborishda xatolik:', error);
    bot.sendMessage(chatId, '❌ Ovoz yuborishda xatolik yuz berdi');
  }
}

// Update user stats
function updateUserStats(userId) {
  if (!userStats[userId]) {
    userStats[userId] = { count: 0, lastUsed: null };
  }
  userStats[userId].count++;
  userStats[userId].lastUsed = new Date();
}

// Show user stats
function showUserStats(chatId, userId) {
  const stats = userStats[userId] || { count: 0 };
  
  const message = `📊 *Sizning statistikangiz:*\n\n` +
    `• Yuborilgan ovozlar: ${stats.count} ta\n` +
    (stats.lastUsed ? `• Oxirgi foydalanish: ${stats.lastUsed.toLocaleString('uz-UZ')}` : '');
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown', ...keyboard });
}

// Show inline help
function showInlineHelp(chatId) {
  const botUsername = 'YourBotUsername'; // O'ZGARTIRING!
  
  const helpText = `
🎯 *Inline Mode - Chatda Ovoz Yuborish*

*Qanday ishlaydi?*
1️⃣ Istalgan chatni oching
2️⃣ \`@${botUsername}\` deb yozing
3️⃣ Ovoz nomini kiriting
4️⃣ Tanlang va yuboring!

*Misollar:*
• \`@${botUsername} salom\`
• \`@${botUsername} rahmat\`
• \`@${botUsername}\` - barcha ovozlar

_@BotFather orqali inline mode yoqilgan bo'lishi kerak!_
  `.trim();

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown', ...keyboard });
}

// Search voices
function searchVoices(chatId, query) {
  const allVoices = getAllVoices();
  const searchTerm = query.toLowerCase().trim();

  const results = Object.entries(allVoices).filter(([key, voice]) => {
    const name = (voice.name || '').toLowerCase();
    const desc = (voice.description || '').toLowerCase();
    const cat = (voice.categoryName || '').toLowerCase();
    
    return name.includes(searchTerm) || 
           desc.includes(searchTerm) || 
           cat.includes(searchTerm);
  });

  if (results.length === 0) {
    bot.sendMessage(chatId, `❌ "${query}" bo'yicha natija topilmadi`, {
      reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Orqaga', callback_data: 'back_main' }]]
      }
    });
    return;
  }

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        ...results.map(([key, voice]) => {
          const [category, voiceKey] = key.split('_');
          return [{
            text: `🎤 ${voice.name} (${voice.categoryName})`,
            callback_data: `voice_${category}_${voiceKey}`
          }];
        }),
        [{ text: '⬅️ Orqaga', callback_data: 'back_main' }]
      ]
    }
  };

  bot.sendMessage(chatId, `🔍 Natijalar: "${query}"\n\n${results.length} ta topildi:`, {
    parse_mode: 'Markdown',
    ...keyboard
  });
}

// ==================== INLINE QUERY HANDLER ====================

bot.on('inline_query', async (query) => {
  const queryText = (query.query || '').toLowerCase().trim();
  const allVoices = getAllVoices();

  try {
    let results = [];

    if (queryText === '') {
      // Bo'sh query - barcha ovozlarni ko'rsatish
      results = Object.entries(allVoices)
        .slice(0, 50)
        .map(([key, voice]) => createInlineResult(key, voice));
    } else {
      // Qidirish
      const filtered = Object.entries(allVoices).filter(([key, voice]) => {
        const name = (voice.name || '').toLowerCase();
        const desc = (voice.description || '').toLowerCase();
        const cat = (voice.categoryName || '').toLowerCase();
        
        return name.includes(queryText) || 
               desc.includes(queryText) || 
               cat.includes(queryText);
      }).slice(0, 50);

      results = filtered.map(([key, voice]) => createInlineResult(key, voice));
    }

    // Natijalarni yuborish
    await bot.answerInlineQuery(query.id, results, {
      cache_time: 300,
      is_personal: true,
      switch_pm_text: "Bot sozlamalari",
      switch_pm_parameter: "inline_help"
    });

    console.log(`📥 Inline query: "${queryText}" - ${results.length} natija`);

  } catch (error) {
    console.error('Inline query xatolik:', error);
    
    await bot.answerInlineQuery(query.id, [], {
      cache_time: 0,
      switch_pm_text: "Botni ishga tushirish",
      switch_pm_parameter: "start"
    });
  }
});

// Create inline result
function createInlineResult(key, voice) {
  const [category, voiceKey] = key.split('_');
  
  // Agar file_id mavjud bo'lsa
  if (voice.file_id) {
    return {
      type: 'voice',
      id: key,
      voice_file_id: voice.file_id,
      title: voice.name || 'Ovoz',
      caption: '',
      // caption: `🎤 ${voice.name || 'Ovoz'}`
    };
  }
  
  // Agar fayl mavjud bo'lsa
  if (fileExists(voice.file)) {
    return {
      type: 'audio',
      id: key,
      audio_url: `./voices/${path.resolve(voice.file)}`,
      title: voice.name || 'Ovoz',
      caption: `🎤 ${voice.name || 'Ovoz'}`,
      performer: voice.categoryName || 'Ovoz',
      audio_duration: 5
    };
  }
  
  // Agar hech narsa bo'lmasa, article qaytaramiz
  return {
    type: 'article',
    id: key,
    title: voice.name || 'Ovoz',
    description: `${voice.categoryName || ''} - Fayl topilmadi`,
    input_message_content: {
      message_text: `❌ ${voice.name} - fayl topilmadi`
    }
  };
}

// Inline natija tanlanganda
bot.on('chosen_inline_result', (result) => {
  const userId = result.from.id;
  console.log(`✅ Inline tanlandi: ${result.result_id} by ${userId}`);
  updateUserStats(userId);
});

// ==================== COMMANDS ====================

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Foydalanuvchi';
  
  bot.sendMessage(
    chatId,
    `👋 Assalomu alaykum, *${userName}*!\n\n` +
    `Men ovozli xabarlar botiman.\n\n` +
    `🎯 *2 usulda foydalaning:*\n` +
    `1️⃣ Menyudan ovoz tanlash\n` +
    `2️⃣ Chatda \`@botusername ovoz\` yozish`,
    { parse_mode: 'Markdown' }
  ).then(() => showMainMenu(chatId));
});

bot.onText(/\/help/, (msg) => {
  showInlineHelp(msg.chat.id);
});

bot.onText(/\/search (.+)/, (msg, match) => {
  searchVoices(msg.chat.id, match[1]);
});

bot.onText(/\/stats/, (msg) => {
  showUserStats(msg.chat.id, msg.from.id);
});

// ==================== CALLBACK QUERY ====================

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  try {
    if (data.startsWith('cat_')) {
      const category = data.replace('cat_', '');
      showCategoryVoices(chatId, category);
      bot.answerCallbackQuery(query.id);
    }
    else if (data.startsWith('voice_')) {
      const parts = data.split('_');
      const category = parts[1];
      const voiceKey = parts.slice(2).join('_');
      
      await sendVoiceMessage(chatId, category, voiceKey, userId);
      bot.answerCallbackQuery(query.id, { text: '✅ Yuborildi!' });
    }
    else if (data === 'back_main') {
      showMainMenu(chatId);
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'stats') {
      showUserStats(chatId, userId);
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'search_prompt') {
      bot.sendMessage(chatId, '🔍 /search <ovoz nomi>');
      bot.answerCallbackQuery(query.id);
    }
    else if (data === 'inline_help') {
      showInlineHelp(chatId);
      bot.answerCallbackQuery(query.id);
    }
  } catch (error) {
    console.error('Callback xatolik:', error);
    bot.answerCallbackQuery(query.id, { text: '❌ Xatolik' });
  }
});

// ==================== ERROR HANDLING ====================

bot.on('polling_error', (error) => {
  console.error('Polling xatolik:', error.message);
});

bot.on('error', (error) => {
  console.error('Bot xatolik:', error);
});

// ==================== SHUTDOWN ====================

process.on('SIGINT', () => {
  console.log('\n🛑 Bot to\'xtatilmoqda...');
  bot.stopPolling();
  process.exit(0);
});

// ==================== START ====================

console.log('🤖 Bot ishga tushdi!');
console.log('📁 Ovoz fayllarini tekshirish...\n');

let missingFiles = 0;
Object.keys(voiceCategories).forEach(categoryKey => {
  const category = voiceCategories[categoryKey];
  Object.keys(category.voices).forEach(voiceKey => {
    const voice = category.voices[voiceKey];
    if (!fileExists(voice.file)) {
      console.log(`❌ Fayl topilmadi: ${voice.file}`);
      missingFiles++;
    }
  });
});

if (missingFiles === 0) {
  console.log('✅ Barcha fayllar mavjud!\n');
} else {
  console.log(`\n⚠️  ${missingFiles} ta fayl topilmadi.\n`);
}

console.log('📱 Inline mode ishga tushdi!');
console.log('Chatda @botusername deb ishlating.\n');
console.log('Ctrl+C - to\'xtatish\n');