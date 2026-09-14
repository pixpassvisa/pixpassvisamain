/**
 * Pings IndexNow (Bing/Yandex) with a list of URLs.
 * @param {string[]} urls - List of absolute URLs to index.
 * @param {string} key - IndexNow API key.
 * @param {string} host - Site hostname (e.g., 'www.pixpassvisa.com').
 */
async function pingIndexNow(urls, key = "5f8e91023c4a4e1ebda2f2709eab758d", host = "www.pixpassvisa.com") {
    const endpoint = "https://api.indexnow.org/IndexNow";
    const payload = {
        host: host,
        key: key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList: urls
    };

    try {
        console.log(`[IndexNow] Pinging ${urls.length} URLs...`);
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log(`[IndexNow] ✅ Success! ${response.status} URLs submitted.`);
        } else {
            console.warn(`[IndexNow] ⚠️ Received error status: ${response.status}`);
            const text = await response.text();
            console.error(`[IndexNow] Response: ${text}`);
        }
    } catch (error) {
        console.error(`[IndexNow] ❌ Error: ${error.message}`);
    }
}

module.exports = { pingIndexNow };
