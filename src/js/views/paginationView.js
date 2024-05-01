import View from './View';
import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${curPage - 1}</span>
        </button>`;
    }
    // Other page
    if (curPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${curPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Page 1, no more pages
    return '';
  }
}

export default new paginationView();
