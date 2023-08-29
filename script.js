const apiUrl = 'https://api.github.com/repos/Extravi/Installer/releases';
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}
async function calculateTotalDownloadCount() {
    try {
        const releases = await fetchData(apiUrl);
        let totalDownloadCount = 0;
        for (const release of releases) {
            totalDownloadCount += release.assets.reduce(
                (acc, asset) => acc + asset.download_count,
                0
            );
        }
        const formattedTotal = `- ${totalDownloadCount.toLocaleString()} downloads`;
        const downloadsCountElement = document.querySelector('.downloads-count');
        downloadsCountElement.textContent = formattedTotal;
    } catch (error) {
        console.error('Error:', error);
    }
}
calculateTotalDownloadCount();