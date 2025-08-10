# 🔐 EMOJISEC
[🇺🇸 English Version](README-en.md)

**EMOJISEC** è una webapp che consente di cifrare messaggi utilizzando l’algoritmo **AES-256-GCM**.

La chiave a 256 bit viene derivata dalla password fornita dall’utente mediante **PBKDF2**.

Il testo cifrato può essere codificato in **Base64** oppure tramite una codifica personalizzata, in cui ogni byte (0–255) viene mappato su un’emoji.

> [!WARNING]
> La chiave di cifratura (256 bit) è derivata dalla password dell’utente tramite **PBKDF2**, che offre un’elevata resistenza agli attacchi brute-force.
> Tuttavia, la sicurezza complessiva dipende dalla robustezza della password scelta: password deboli possono compromettere la protezione del testo cifrato.

## 🔧 Utilizzo
L’app può essere usata direttamente online, salvata in locale oppure installata come PWA.

**Per cifrare un messaggio:**
1. Inserire la password.
2. *(Opzionale)* Scegliere la codifica: EMOJI (predefinita) oppure Base64.
3. Digitare il messaggio.
4. Premere **Encrypt**: il testo cifrato sostituirà quello in chiaro.

**Per decifrare un messaggio:**
1. Inserire la password.
2. Incollare il ciphertext.
3. *(Default: emoji)* Selezionare la codifica corretta del ciphertext inserito.
4. Premere **Decrypt**: il testo in chiaro sostituirà quello cifrato.

## ⚙️ Dettagli tecnici

- **Algoritmo di cifratura:** AES-256-GCM
- **Derivazione della chiave:** PBKDF2
  - Salt: 128 bit
  - Iterazioni: 256 000
  - Hash: SHA-384

## ⚠️ Disclaimer
Questa applicazione è stata sviluppata a scopo puramente ludico.
L’autore non si assume alcuna responsabilità per eventuali usi illeciti o per la perdita di informazioni.

Inoltre, futuri aggiornamenti potrebbero compromettere la compatibilità con testi cifrati da versioni precedenti.