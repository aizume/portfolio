function openModal(imageSrc) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certModalImg");
    
    modal.style.display = "flex";
    modalImg.src = imageSrc;
    
    modalImg.style.opacity = "0";
    setTimeout(() => {
        modalImg.style.opacity = "1";
    }, 100);
}

function closeModal() {
    const modal = document.getElementById("certModal");
    modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
});
