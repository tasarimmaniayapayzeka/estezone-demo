# AI Cihaz Asistanı — Canlıya Alma (10 dakika)

Demo (GitHub Pages) statik olduğu için PHP çalışmaz; bot orada **kural tabanlı** yanıt verir.
Site cPanel'e taşınınca aşağıdaki 3 adım yapılınca **gerçek AI** devreye girer.
Kod değişikliği gerekmez.

---

## 1) Anahtar dosyasını web kökünün DIŞINA koy

`api/ORNEK-estezone-gizli.php` dosyasını **`estezone-gizli.php`** adıyla kaydedip
cPanel Dosya Yöneticisi'nde şuraya yükleyin:

```
/home/<cpanel-kullanicisi>/estezone-gizli.php      ← public_html'in BİR ÜSTÜ
```

> **public_html içine koymayın.** Orada dosya bir yapılandırma hatasında düz metin
> olarak indirilebilir; anahtar sızarsa fatura size yazılır.

İçini doldurun:

```php
<?php
define('ESTEZONE_OPENAI_KEY', 'sk-...');   // platform.openai.com/api-keys
define('ESTEZONE_MODEL', 'gpt-5-mini');    // maliyet/kalite dengesi için önerilen
```

Dosya izni: **600** (yalnız sahibi okusun).

## 2) Site dosyalarını yükleyin

`site/` klasörü olduğu gibi `public_html`e gider. İçinde şunlar hazır gelir:

- `api/sohbet.php` — OpenAI vekili (anahtar burada **değil**)
- `api/bilgi-tabani.txt` — sistem promptu; her derlemede içerikten yeniden üretilir
- `.htaccess` — .txt/.md/.json dosyalarını dışarıya kapatır

## 3) Alan adını izinli listeye ekleyin

`api/sohbet.php` içinde:

```php
$IZINLI_HOSTLAR = ['estezone.com.tr', 'www.estezone.com.tr', 'localhost', '127.0.0.1'];
```

Alan adı farklıysa buraya ekleyin. Bu liste, anahtarınızın başka sitelerden
kullanılmasını engeller.

---

## Test

Sitede sohbeti açıp "Alexandrite cihazlarınız neler?" yazın.

| Görünen | Anlamı |
|---|---|
| Akıcı, soruya özel cevap | AI çalışıyor ✅ |
| Hazır kalıp cevap + cihaz kartları | Kural tabanlı yedek — anahtar okunamıyor |
| "Çok hızlı yazıyorsunuz" | Hız sınırı (dakikada 12 mesaj) |

Sorun varsa cPanel → **Errors** günlüğünde `estezone-sohbet:` satırlarına bakın.

---

## Güvenlik özeti (kod içinde hazır)

- Anahtar sunucuda, web kökü dışında; tarayıcı asla görmez
- Yalnız POST + izinli alan adı; yabancı köken 403
- Dakikada 12 mesaj sınırı (IP başına, dosya tabanlı)
- Soru 1000 karakterle, geçmiş son 6 turla sınırlı
- **KVKK maskesi:** TC kimlik, telefon ve e-posta OpenAI'ye gönderilmeden gizlenir
- **Prompt injection kalkanı:** kurallar mesaj dizisinin sonunda tekrarlanır
- **Çıktı kalkanı:** model fiyat söylerse yanıt kodla değiştirilir (mevzuat)

## Maliyet

Her mesajda sistem promptu (~5k token) gönderilir. `gpt-5-mini` ile mesaj başına
kabaca 1 kuruşun altı; yoğun kullanımda OpenAI panelinden **aylık limit** koyun
(Billing → Limits). Sıkı kontrol isterseniz model `gpt-5-nano` yapılabilir.
