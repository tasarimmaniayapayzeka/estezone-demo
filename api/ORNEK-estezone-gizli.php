<?php
/* ==========================================================================
   ÖRNEK ANAHTAR DOSYASI — bu dosyayı OLDUĞU YERDE BIRAKMAYIN.
   --------------------------------------------------------------------------
   Adını `estezone-gizli.php` yapıp WEB KÖKÜNÜN DIŞINA kopyalayın:
       /home/<cpanel-kullanicisi>/estezone-gizli.php
   public_html içine KOYMAYIN — orada dosya indirilebilir hâle gelebilir.
   Bu klasördeki dosya repoda durur, gerçek anahtar repoya GİRMEZ.
   ========================================================================== */

// OpenAI anahtarı — https://platform.openai.com/api-keys
define('ESTEZONE_OPENAI_KEY', 'sk-BURAYA-GERCEK-ANAHTAR');

// Model. gpt-5* ve o-serisi için proxy otomatik olarak max_completion_tokens
// kullanır ve temperature göndermez (bu modeller özel temperature reddediyor).
define('ESTEZONE_MODEL', 'gpt-5.5');

// Kaba maliyet koruması (şu an bilgi amaçlı; sıkı limit OpenAI panelinden konur)
define('ESTEZONE_AYLIK_LIMIT_USD', 20);
