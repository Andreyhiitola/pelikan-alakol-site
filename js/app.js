// ============================================
// Конфигурация
// ============================================
const CONFIG = {
    contentPath: 'content',
    weatherApiKey: 'f59a23d3c33e1335a9226aad91b13cdf',
    lat: 45.955,
    lon: 81.5714
};

// ============================================
// Загрузка контента из JSON
// ============================================
async function loadContent(filename) {
    try {
        const url = `${CONFIG.contentPath}/${filename}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка загрузки ${filename}`);
        return await response.json();
    } catch (error) {
        console.error(`Ошибка загрузки ${filename}:`, error);
        return null;
    }
}

// ============================================
// Погода с OpenWeatherMap API
// ============================================
async function loadWeather() {
    const container = document.getElementById('weather-widget');
    
    try {
        // Загрузка текущей погоды
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.lat}&lon=${CONFIG.lon}&appid=${CONFIG.weatherApiKey}&units=metric&lang=ru`;
        
        // Загрузка прогноза на 5 дней
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${CONFIG.lat}&lon=${CONFIG.lon}&appid=${CONFIG.weatherApiKey}&units=metric&lang=ru`;
        
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);
        
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Ошибка API');
        }
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayWeather(currentData, forecastData);
    } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
        displayTestWeather();
    }
}

function displayWeather(current, forecast) {
    const container = document.getElementById('weather-widget');
    
    // Оценка температуры воды (примерно на 2-3 градуса холоднее воздуха)
    const waterTemp = Math.round(current.main.temp - 2);
    
    // Иконки погоды
    const weatherIcons = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    
    const icon = weatherIcons[current.weather[0].icon] || '🌤️';
    
    // Прогноз на 5 дней (берем полдень каждого дня)
    const dailyForecast = [];
    const seenDates = new Set();
    
    forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
        
        if (!seenDates.has(dateStr) && date.getHours() === 12) {
            seenDates.add(dateStr);
            dailyForecast.push({
                date: dateStr,
                temp: Math.round(item.main.temp),
                icon: weatherIcons[item.weather[0].icon] || '🌤️'
            });
        }
    });
    
    container.innerHTML = `
        <div class="weather-content">
            <div class="weather-main">
                <div class="weather-icon">${icon}</div>
                <div class="weather-temp">${Math.round(current.main.temp)}°C</div>
                <div class="weather-description">${current.weather[0].description}</div>
            </div>
            
            <div class="weather-details">
                <div class="weather-detail-item water-temp">
                    <div class="weather-detail-label">🌊 Температура воды</div>
                    <div class="weather-detail-value">${waterTemp}°C</div>
                </div>
                <div class="weather-detail-item">
                    <div class="weather-detail-label">🌡️ Ощущается как</div>
                    <div class="weather-detail-value">${Math.round(current.main.feels_like)}°C</div>
                </div>
                <div class="weather-detail-item">
                    <div class="weather-detail-label">💧 Влажность</div>
                    <div class="weather-detail-value">${current.main.humidity}%</div>
                </div>
                <div class="weather-detail-item">
                    <div class="weather-detail-label">💨 Ветер</div>
                    <div class="weather-detail-value">${Math.round(current.wind.speed)} м/с</div>
                </div>
            </div>
        </div>
        
        <div class="weather-forecast">
            ${dailyForecast.slice(0, 5).map(day => `
                <div class="forecast-day">
                    <div class="forecast-date">${day.date}</div>
                    <div class="forecast-icon">${day.icon}</div>
                    <div class="forecast-temp">${day.temp}°C</div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayTestWeather() {
    const container = document.getElementById('weather-widget');
    container.innerHTML = `
        <div class="weather-content">
            <div class="weather-main">
                <div class="weather-icon">☀️</div>
                <div class="weather-temp">28°C</div>
                <div class="weather-description">Ясно</div>
            </div>
            
            <div class="weather-details">
                <div class="weather-detail-item water-temp">
                    <div class="weather-detail-label">🌊 Температура воды</div>
                    <div class="weather-detail-value">26°C</div>
                </div>
                <div class="weather-detail-item">
                    <div class="weather-detail-label">🌡️ Ощущается как</div>
                    <div class="weather-detail-value">30°C</div>
                </div>
                <div class="weather-detail-item">
                    <div class="weather-detail-label">💧 Влажность</div>
                    <div class="weather-detail-value">45%</div>
                </div>
                <div class="weather-detail-item">
                    <div class="weather-detail-label">💨 Ветер</div>
                    <div class="weather-detail-value">3 м/с</div>
                </div>
            </div>
        </div>
        
        <div class="weather-forecast">
            <div class="forecast-day">
                <div class="forecast-date">9 ноя</div>
                <div class="forecast-icon">☀️</div>
                <div class="forecast-temp">27°C</div>
            </div>
            <div class="forecast-day">
                <div class="forecast-date">10 ноя</div>
                <div class="forecast-icon">⛅</div>
                <div class="forecast-temp">25°C</div>
            </div>
            <div class="forecast-day">
                <div class="forecast-date">11 ноя</div>
                <div class="forecast-icon">🌦️</div>
                <div class="forecast-temp">23°C</div>
            </div>
            <div class="forecast-day">
                <div class="forecast-date">12 ноя</div>
                <div class="forecast-icon">☁️</div>
                <div class="forecast-temp">22°C</div>
            </div>
            <div class="forecast-day">
                <div class="forecast-date">13 ноя</div>
                <div class="forecast-icon">☀️</div>
                <div class="forecast-temp">26°C</div>
            </div>
        </div>
    `;
}

// ============================================
// Отображение размещения
// ============================================
async function displayAccommodation() {
    const data = await loadContent('accommodation.json');
    if (!data || !data.accommodation) return;
    
    const container = document.getElementById('accommodation-list');
    container.innerHTML = data.accommodation.map(item => `
        <div class="card">
            <span class="card-type">${item.type}</span>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <p class="card-info-item">👥 ${item.capacity}</p>
            <div class="card-amenities">
                ${item.amenities.map(amenity => `
                    <span class="amenity-tag">${amenity}</span>
                `).join('')}
            </div>
            <div class="card-price">${item.price}</div>
            <button class="btn btn-primary" style="width: 100%;" onclick="scrollToSection('contacts')">Забронировать</button>
        </div>
    `).join('');
}

// ============================================
// Отображение инфраструктуры
// ============================================
async function displayInfrastructure() {
    const data = await loadContent('infrastructure.json');
    if (!data || !data.infrastructure) return;
    
    const container = document.getElementById('infrastructure-list');
    container.innerHTML = data.infrastructure.map(item => `
        <div class="feature-card">
            <div class="feature-icon-large">${item.icon}</div>
            <h3 class="feature-title">${item.title}</h3>
            <p class="feature-description">${item.description}</p>
        </div>
    `).join('');
}

// ============================================
// Отображение активностей
// ============================================
async function displayActivities() {
    const data = await loadContent('activities.json');
    if (!data || !data.activities) return;
    
    const container = document.getElementById('activities-list');
    container.innerHTML = data.activities.map(item => `
        <div class="timeline-item">
            <div class="timeline-time">${item.time}</div>
            <div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-location">📍 ${item.location}</p>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// Отображение акций
// ============================================
async function displayOffers() {
    const data = await loadContent('offers.json');
    if (!data || !data.offers) return;
    
    const container = document.getElementById('offers-list');
    container.innerHTML = data.offers.map(item => `
        <div class="offer-card">
            <div class="offer-badge">${item.discount}</div>
            <h3 class="offer-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
            <p class="contact-detail" style="font-style: italic;">Условия: ${item.conditions}</p>
        </div>
    `).join('');
}

// ============================================
// Отображение контактов
// ============================================
async function displayContacts() {
    const data = await loadContent('contacts.json');
    if (!data || !data.contacts) return;
    
    const container = document.getElementById('contacts-info');
    container.innerHTML = data.contacts.map(item => `
        <div class="contact-card">
            <div class="contact-icon">${item.icon}</div>
            <h3 class="contact-type">${item.type}</h3>
            ${item.address ? `<p class="contact-detail">📍 ${item.address}</p>` : ''}
            ${item.phone ? `<p class="contact-detail">📞 ${item.phone}</p>` : ''}
            ${item.mobile ? item.mobile.map(phone => `
                <p class="contact-detail">📱 ${phone}</p>
            `).join('') : ''}
            ${item.email ? item.email.map(email => `
                <p class="contact-detail">📧 ${email}</p>
            `).join('') : ''}
            ${item.gps ? `<p class="contact-detail">🗺️ ${item.gps.text}</p>` : ''}
            ${item.distances ? item.distances.map(distance => `
                <p class="contact-detail">🚗 ${distance}</p>
            `).join('') : ''}
        </div>
    `).join('');
}

// ============================================
// Утилиты навигации
// ============================================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Плавная прокрутка для всех ссылок
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Активная ссылка при скролле
function updateActiveLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// Инициализация
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    displayAccommodation();
    displayInfrastructure();
    displayActivities();
    displayOffers();
    displayContacts();
    
    // Обновление погоды каждые 30 минут
    setInterval(loadWeather, 30 * 60 * 1000);
});
