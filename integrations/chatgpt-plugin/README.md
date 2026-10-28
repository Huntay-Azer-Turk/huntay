# ChatGPT eklenti paketi (OpenAI Plugins Directory)

Bu klasör, `https://huntayazerturk.com/mcp` MCP sunucusunu ChatGPT eklenti dizinine göndermek için gereken paketi içerir.

- `plugin.json`: listeleme bilgileri (ad, açıklamalar, URL'ler, görseller), inceleme test senaryoları (5 olumlu + 3 olumsuz) ve yayın notları (Türkçe çeviri dahil).
- `mcp.json`: tek uzak MCP sunucusu, kimlik doğrulama yok.
- `assets/`: logo, ikon ve ekran görüntüleri (`public/icons` ve `public/press` kopyaları).

Araç adları, açıklamaları veya sunucu davranışı değişirse `plugin.json` içindeki test senaryolarını ve `version` alanını güncelleyin.

## ZIP oluşturma

```bash
cd integrations/chatgpt-plugin
zip -r ../huntay-azerturk-chatgpt-plugin.zip plugin.json mcp.json assets
```

Bu README ZIP'e eklenmez.

## Gönderim adımları

1. OpenAI Platform'da organizasyon doğrulamasını (bireysel kimlik doğrulama) tamamlayın; yayıncı adı "Huntay AzerTürk" olmalı.
2. ChatGPT'de geliştirici modunu açıp sunucuyu bağlayın ve 5 olumlu senaryoyu çalıştırırken 2–3 dakikalık ekran kaydı alın. Videoyu liste dışı YouTube veya Loom'a yükleyin.
3. platform.openai.com/plugins → "Upload new or existing plugin" → ZIP'i yükleyin; "Metadata & Skills" kontrollerindeki uyarıları giderin.
4. "MCPs" → "Connect": URL `https://huntayazerturk.com/mcp`, kimlik doğrulama "No authentication". Alan adı doğrulaması için verilen değeri `lib/mcp/meta.ts` içindeki `openaiAppsChallenge` sabitine yazıp yayınlayın; `https://huntayazerturk.com/.well-known/openai-apps-challenge` yalnızca bu değeri düz metin olarak döndürür. Ardından doğrulayın ve araç taramasının bulgularını kontrol edin.
5. "Review information" → "Review details": video bağlantısını girin, içe aktarılan test senaryolarını kontrol edip kaydedin.
6. "Submit for review" → beyanları onaylayın. Onaydan sonra "Publish plugin".

## Notlar

- Aynı anda yalnızca bir sürüm incelemede olabilir. İnceleme sürerken araçları değiştirmeyin; gerekirse incelemeyi iptal edip yeniden gönderin.
- İnceleyiciler test için gerçek randevu oluşturabilir; bunları onay e-postasındaki bağlantıdan veya Cal.com'dan iptal edin.
- Sunucu kökeni (`https://huntayazerturk.com`) değişirse yeni bir eklenti gerekir; yalnızca yol değişirse yeni sürüm yeterlidir.
