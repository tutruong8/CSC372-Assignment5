function stripHtmlTags(str) {
  if (!str) {
    return "Not Available";
  }
  return str.replace(/<[^>]*>/g, '');
}

function formatDate(dateString) {
  if (!dateString) {
    return "Not Available";
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {timeZone: 'UTC'});

}

function formatDateTime(timeStamp) {
  if (!timeStamp) {  
    return "Not Available";
  }
  const date = new Date(timeStamp * 1000);
    return date.toLocaleString();
}

function getChannel(show) {
    return show.network ? show.network.name : (show.webChannel ? show.webChannel.name : "Not Available");
}

async function fetchJson(url) { 
    const res = await fetch(url);
    if (res.status === 429) {
        const error = new Error("Too many requests. Please wait a moment and try again.");
        error.status = 429;
        throw error;
    }
    if (!res.ok) {
        const error = new Error(await res.text());
        error.status = res.status;
        throw error;
    }
    return res.json();
} 

export { stripHtmlTags, formatDate, formatDateTime, getChannel, fetchJson };