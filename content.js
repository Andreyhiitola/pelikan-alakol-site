// ============================================
// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ content.js
// ============================================

// ============================================
// 1. ИМПОРТ
// ============================================

import { 
  allContent, 
  getSection, 
  getAccommodation, 
  getActivities, 
  getServices,
  getContacts,
  getOffers,
  getGallery,
  getNavigation,
  getItemById,
  getServicesByCategory,
  getGalleryByCategory
} from './content.js';


// ============================================
// 2. ПОЛУЧИТЬ ВСЁ СРАЗУ
// ============================================

console.log('📦 ВСЕ ДАННЫЕ:');
console.log(allContent);


// ============================================
// 3. ПОЛУЧИТЬ РАЗДЕЛ ПО НАЗВАНИЮ
// ============================================

console.log('📍 Получить раздел:');
console.log(getSection('accommodation'));   // 7 номеров
console.log(getSection('gallery'));         // 16 фото
console.log(getSection('activities'));      // 21 активность
console.log(getSection('services'));        // 15 услуг
console.log(getSection('offers'));          // 8 предложений


// ============================================
// 4. БЫСТРЫЕ ФУНКЦИИ ДЛЯ КАЖДОЙ СЕКЦИИ
// ============================================

console.log('⚡ Быстрые функции:');

const accommodation = getAccommodation();
console.log('🛏️ Размещение:', accommodation.length, 'типов');
// Результат: 7 типов номеров

const activities = getActivities();
console.log('🎉 Активности:', activities.length, 'видов');
// Результат: 21 активность

const services = getServices();
console.log('✨ Услуги:', services.length, 'услуг');
// Результат: 15 услуг

const contacts = getContacts();
console.log('📞 Контакты:', contacts.address);
// Результат: озеро Алаколь, пос. Акши...

const offers = getOffers();
console.log('🎁 Предложения:', offers.length, 'предложений');
// Результат: 8 предложений

const gallery = getGallery();
console.log('📸 Галерея:', gallery.length, 'фото');
// Результат: 16 фотографий

const navigation = getNavigation();
console.log('🗺️ Навигация:', navigation.length, 'пунктов');
// Результат: 8 пунктов меню


// ============================================
// 5. ПОЛУЧИТЬ КОНКРЕТНЫЙ ЭЛЕМЕНТ ПО ID
// ============================================

console.log('🔍 Получить элемент по ID:');

// Получить номер "Семейный 6х"
const familyRoom = getItemById('accommodation', 'family-6');
console.log('🛏️ Семейный номер:', familyRoom);
// { id: 'family-6', title: 'Семейный 6х', price: '27 000 ₸/ночь', ... }

// Получить активность "Плавание"
const swimming = getItemById('activities', 'swimming');
console.log('🏊 Плавание:', swimming);
// { id: 'swimming', title: 'Плавание', time: '9:00 - 21:00', ... }

// Получить услугу "WiFi"
const wifi = getItemById('services', 'wifi');
console.log('📶 WiFi:', wifi);
// { id: 'wifi', title: 'Бесплатный WiFi', ... }

// Получить предложение "Ранняя птица"
const earlyBird = getItemById('offers', 'early-bird-10');
console.log('🐦 Ранняя птица:', earlyBird);
// { id: 'early-bird-10', discount: 10, ... }

// Получить фото озера
const lakePhoto = getItemById('gallery', 'lake-view');
console.log('🏞️ Озеро:', lakePhoto);
// { id: 'lake-view', title: 'Вид на озеро', url: '...', ... }


// ============================================
// 6. ФИЛЬТР ПО КАТЕГОРИЯМ
// ============================================

console.log('🏷️ Фильтр по категориям:');

// Получить все услуги инфраструктуры
const infrastructure = getServicesByCategory('infrastructure');
console.log('🏗️ Инфраструктура:', infrastructure.length, 'объектов');
infrastructure.forEach(service => {
  console.log(`  - ${service.icon} ${service.title}`);
});
// Результат:
//   - 🏖️ Чистый пляж
//   - 🏊 Бассейны с подогревом
//   - 🌳 Более 5000 деревьев
// ... и т.д.

// Получить все услуги активностей
const activitiesServices = getServicesByCategory('activities');
console.log('🎪 Активности (услуги):', activitiesServices.length, 'услуг');

// Получить услуги по сервисам
const servicesByServices = getServicesByCategory('services');
console.log('💚 Сервисы:', servicesByServices.length, 'услуг');

// Получить фото природы
const naturePhotos = getGalleryByCategory('nature');
console.log('🌿 Природа:', naturePhotos.length, 'фото');
// Результат: 7 фото природы

// Получить фото размещения
const accommodationPhotos = getGalleryByCategory('accommodation');
console.log('🏠 Размещение (фото):', accommodationPhotos.length, 'фото');

// Получить фото активностей
const activitiesPhotos = getGalleryByCategory('activities');
console.log('🎉 Активности (фото):', activitiesPhotos.length, 'фото');

// Получить фото инфраструктуры
const infrastructurePhotos = getGalleryByCategory('infrastructure');
console.log('🏗️ Инфраструктура (фото):', infrastructurePhotos.length, 'фото');


// ============================================
// 7. ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// ============================================

console.log('\n=== ПРАКТИЧЕСКИЕ ПРИМЕРЫ ===\n');

// Пример 1: Показать все номера с ценой
console.log('📌 Пример 1: Все номера с ценой');
getAccommodation().forEach(room => {
  console.log(`${room.icon} ${room.title} - ${room.price} (${room.capacity} чел)`);
});
// Результат:
// 🏠 Эконом 3х - 12 600 ₸/ночь (3 чел)
// 🏘️ Эконом Коннект 5х - 21 000 ₸/ночь (5 чел)
// ... и т.д.

// Пример 2: Найти самый дешёвый номер
console.log('\n📌 Пример 2: Самый дешёвый номер');
const cheapest = getAccommodation().reduce((min, room) => {
  const minPrice = parseInt(min.price);
  const roomPrice = parseInt(room.price);
  return roomPrice < minPrice ? room : min;
});
console.log(`${cheapest.icon} ${cheapest.title} - ${cheapest.price}`);
// Результат: 🏠 Эконом 3х - 12 600 ₸/ночь

// Пример 3: Все активности с временем работы
console.log('\n📌 Пример 3: Активности с временем');
getActivities().forEach(activity => {
  console.log(`${activity.icon} ${activity.title} (${activity.time})`);
});
// Результат:
// 🏊 Плавание (9:00 - 21:00)
// 🚣 Водные виды спорта (10:00 - 18:00)
// ... и т.д.

// Пример 4: Все услуги инфраструктуры
console.log('\n📌 Пример 4: Инфраструктура');
getServicesByCategory('infrastructure').forEach(service => {
  console.log(`${service.icon} ${service.title}`);
  console.log(`   📝 ${service.description}`);
});

// Пример 5: Все фотографии природы
console.log('\n📌 Пример 5: Фото природы');
getGalleryByCategory('nature').forEach(photo => {
  console.log(`${photo.title}`);
  console.log(`   🔗 ${photo.url}`);
});

// Пример 6: Количество каждой категории
console.log('\n📌 Пример 6: Статистика');
console.log('📊 СТАТИСТИКА:');
console.log('  - Размещение:', getAccommodation().length);
console.log('  - Активности:', getActivities().length);
console.log('  - Услуги:', getServices().length);
console.log('  - Предложения:', getOffers().length);
console.log('  - Фото:', getGallery().length);
console.log('  - Пункты меню:', getNavigation().length);


// ============================================
// 8. ИСПОЛЬЗОВАНИЕ В HTML/JSX
// ============================================

console.log('\n=== ИСПОЛЬЗОВАНИЕ В HTML ===\n');

// Пример: Вывести все номера в таблицу
function renderAccommodationTable() {
  const rooms = getAccommodation();
  let html = '<table><tr><th>Номер</th><th>Цена</th><th>Человек</th></tr>';
  
  rooms.forEach(room => {
    html += `<tr>
      <td>${room.icon} ${room.title}</td>
      <td>${room.price}</td>
      <td>${room.capacity}</td>
    </tr>`;
  });
  
  html += '</table>';
  return html;
}

// Пример: Вывести галерею
function renderGallery() {
  const photos = getGallery();
  let html = '<div class="gallery">';
  
  photos.forEach(photo => {
    html += `<div class="gallery-item">
      <img src="${photo.url}" alt="${photo.title}">
      <h3>${photo.title}</h3>
      <p>${photo.description}</p>
    </div>`;
  });
  
  html += '</div>';
  return html;
}

// Пример: Вывести активности по категориям
function renderActivitiesList() {
  const activities = getActivities();
  let html = '<ul class="activities">';
  
  activities.forEach(activity => {
    html += `<li>
      <strong>${activity.icon} ${activity.title}</strong><br>
      📍 ${activity.location}<br>
      ⏰ ${activity.time}
    </li>`;
  });
  
  html += '</ul>';
  return html;
}


// ============================================
// 9. РАБОТА С КОНТАКТАМИ
// ============================================

console.log('\n=== КОНТАКТЫ ===\n');

const contact = getContacts();
console.log('📍 Адрес:', contact.address);
console.log('📞 Телефон:', contact.phone.base);
console.log('📧 Email:', contact.email);
console.log('🕐 Часы:', contact.hours);
console.log('🔗 Telegram:', contact.social.telegram);
console.log('📸 Instagram:', contact.social.instagram);


// ============================================
// 10. РАБОТА С ПРЕДЛОЖЕНИЯМИ
// ============================================

console.log('\n=== СПЕЦПРЕДЛОЖЕНИЯ ===\n');

const offers = getOffers();
console.log('Активные предложения:');
offers.filter(offer => offer.active).forEach(offer => {
  console.log(`${offer.icon} ${offer.title}`);
  console.log(`   📝 ${offer.description}`);
  if (offer.discount) console.log(`   💰 Скидка: ${offer.discount}%`);
  if (offer.bonus) console.log(`   🎁 Бонус: ${offer.bonus}`);
});


// ============================================
// ИТОГО
// ============================================

console.log('\n✅ ВСЕ ФУНКЦИИ ГОТОВЫ К ИСПОЛЬЗОВАНИЮ!');
console.log('📚 Документация: CONTENT-COMPLETE-GUIDE.md');
