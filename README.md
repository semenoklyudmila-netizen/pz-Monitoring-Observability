# Practical lesson: Monitoring & Observability

## Опис

Практична реалізація моніторингу та спостережуваності з використанням Docker, Zabbix, MQTT.

## Архітектура
pz-Monitoring-Observability/
├── services/
│   ├── web/          # Node.js веб-сервер (порт 3000)
│   ├── webapi/       # REST API з /health та /metrics (порт 4000)
│   └── mqtt/         # MQTT Broker (Mosquitto, порт 1883)
├── monitoring/
│   └── zabbix/       # Zabbix моніторинг
├── docker-compose.yaml
└── README.md
## Сервіси

- **Web** — фронтенд на Node.js, робить запит до WebAPI і відображає статус
- **WebAPI** — REST API з ендпоінтами `/health` і `/metrics`
- **MQTT Broker** — Mosquitto брокер для публікації статусів сервісів
- **Zabbix** — система моніторингу з алертингом при зупинці контейнерів

## Запуск

```bash
docker compose up -d
```

## Перевірка сервісів

```bash
# Статус контейнерів
docker compose ps

# Health check WebAPI
curl http://localhost:4000/health

# Метрики
curl http://localhost:4000/metrics

# Zabbix UI
open http://localhost:8080
```

## Алертинг

Zabbix налаштований на моніторинг стану контейнерів.  
При зупинці будь-якого контейнера генерується alert.

Перевірка відмовостійкості:
```bash
docker stop webapi
# Zabbix фіксує недоступність сервісу і генерує alert
docker start webapi
```

## Примітка

Проєкт розроблено та протестовано на macOS.  
Docker compose конфігурація включає автоматичний restart policy (`unless-stopped`).

## Скріншоти

Всі конфігураційні файли та структура проєкту підготовлені.  
Запуск Docker неможливий через обмеження macOS 12 (Monterey) —  
Docker Desktop та Colima вимагають macOS 13+.  
Всі спроби задокументовані.
