const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  galleryEl: document.querySelector(".gallery"),
  imgEl: document.querySelector("img"),
  modalEl: document.querySelector(".lightbox"),
  closeBtnEl: document.querySelector('[data-action="close-lightbox"]'),
};

refs.closeBtnEl.textContent = "X";
let activeImg = 0;
const imgLength = galleryItems.length - 1;

refs.galleryEl.addEventListener("click", onImgClick);
refs.closeBtnEl.addEventListener("click", onCloseButtonClick);
document.addEventListener("keydown", onKeyPress);

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return false;
  refs.modalEl.classList.add("is-open");
  activeImg = +e.target.dataset.index;
  getData(activeImg);
}

function onCloseButtonClick(e) {
  refs.modalEl.classList.remove("is-open");
  updateAttr();
}

function onKeyPress(e) {
  if (e.key === "Escape") return onCloseButtonClick();
  if (e.key === "ArrowRight") return getNextPicture();
  if (e.key === "ArrowLeft") return getPrevPicture();
}

function getNextPicture() {
  activeImg += 1;
  if (activeImg > imgLength) activeImg = 0;
  getData(activeImg);
}

function getPrevPicture() {
  activeImg -= 1;
  if (activeImg < 0) activeImg = imgLength;
  getData(activeImg);
}

function getData(index) {
  const d = galleryItems[index];
  updateAttr(d.original, d.description);
}

function updateAttr(src = "", alt = "") {
  refs.imgEl.src = src;
  refs.imgEl.alt = alt;
}

const galleryMarkup = createGalleryMarkupStr(galleryItems);

refs.galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkupStr(images) {
  return images
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-index="${index}" data-source="${original}" alt="${description}"></a></li>`;
    })
    .join("");
}
