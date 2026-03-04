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
    }
  }
};

// User statistics
const userStats = {};

// Helper function to check if file exists
function fileExists(filePath) {
  try {
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