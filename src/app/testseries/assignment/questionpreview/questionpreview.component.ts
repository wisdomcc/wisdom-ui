import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { TestSeriesQuestionMap } from '../../../../models/testseries/testseries.model';

@Component({
  selector: 'app-questionpreview',
  templateUrl: './questionpreview.component.html',
  styleUrls: ['./questionpreview.component.css']
})
export class QuestionpreviewComponent implements OnInit {
  public rows: Array<QuestionModel> = [];
  public columns: Array<any> = [
    {title: 'Question', width: 10, name: 'question', filtering: {filterString: '', placeholder: 'Filter by question'}},
    {title: 'Year', name: 'year', width: 1, className: 'office-header text-success', sort: 'desc'}
  ];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  data: QuestionModel[];
  testSeriesQuestionMaps: TestSeriesQuestionMap[];
  @Input() selectedQuestions: boolean[];

  public constructor() {
  }

  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }

  setTestSeriesQuestionMap(questionId: any) {   
    if(this.testSeriesQuestionMaps === undefined) {
      this.testSeriesQuestionMaps = [];
    }
    const index = this.testSeriesQuestionMaps.findIndex(
        data =>  data.questionId === questionId);
    if(index === -1) {
      this.testSeriesQuestionMaps.push(new TestSeriesQuestionMap(questionId));
    } else {
      this.testSeriesQuestionMaps.splice(index, 1);
    }
    console.log(this.testSeriesQuestionMaps);
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    if (data !== undefined && data.length > 0) {
      const start = (page.page - 1) * page.itemsPerPage;
      const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
    return data;
  }

  public changeSort(data: any, config: any): any {
    if (data !== undefined && data.length > 0) {
      if (!config.sorting) {
        return data;
      }

      const columns = this.config.sorting.columns || [];
      let columnName: string = void 0;
      let sort: string = void 0;

      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sort !== undefined) {
          columnName = columns[i].name;
          sort = columns[i].sort;
        }
      }

      if (!columnName) {
        return data;
      }

      // simple sorting
      return data.sort((previous: any, current: any) => {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }
    return data;
  }

  public changeFilter(data: any, config: any): any {
    if (data !== undefined && data.length > 0) {
      let filteredData: Array<any> = data;
      this.columns.forEach((column: any) => {
        if (column.filtering) {
          filteredData = filteredData.filter((item: any) => {
            return item[column.name].match(column.filtering.filterString);
          });
        }
      });

      if (!config.filtering) {
        return filteredData;
      }

      if (config.filtering.columnName) {
        return filteredData.filter((item: any) =>
          item[config.filtering.columnName].match(this.config.filtering.filterString));
      }

      const tempArray: Array<any> = [];
      filteredData.forEach((item: any) => {
        let flag = false;
        this.columns.forEach((column: any) => {
          if (item[column.name].toString().match(this.config.filtering.filterString)) {
            flag = true;
          }
        });
        if (flag) {
          tempArray.push(item);
        }
      });
      filteredData = tempArray;

      return filteredData;
    }
    return data;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    if (sortedData !== undefined && sortedData.length > 0) {
      for (let i = 0; i < sortedData.length; i++) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, sortedData[i].question]);
      }
      if (config.name) {
        this.rows = page ? this.changePage(page, sortedData) : sortedData;
      } else {
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      }
      this.length = sortedData.length;
    }
  }

  public onCellClick(rows: QuestionModel[]) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
}

