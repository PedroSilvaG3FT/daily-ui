import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppTableComponent } from '../../../../@core/components/app-table/app-table.component';
import { filterListPagination } from '../../../../@core/functions/pagination.function';
import { IPagination } from '../../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../../@core/services/alert.service';
import { IDocDocumentDatabase } from '../../../interfaces/doc-document-database.interface';
import { FirebaseExampleService } from '../../../services/firebase-example.service';

@Component({
  standalone: true,
  selector: 'doc-firebase-firestore',
  imports: [AppTableComponent, MatButtonModule],
  styleUrl: './firebase-firestore.component.scss',
  templateUrl: './firebase-firestore.component.html',
})
export class FirebaseFirestoreComponent {
  public loadingStore = inject(LoadingStore);
  public documentsData: IDocDocumentDatabase[] = [];
  private readonly errorMessage = `An error occurred while processing the request`;

  public tableData: IDocDocumentDatabase[] = [];
  public documents: IDocDocumentDatabase[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 0,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<IDocDocumentDatabase>[] = [
    {
      title: 'View',
      icon: 'solar:eye-broken',
      callback: (element) => this.getDocument(String(element.id)),
    },
    {
      title: 'Update',
      icon: 'radix-icons:update',
      callback: (element) => this.updateDocument(element),
    },
    {
      title: 'Delete',
      icon: 'iwwa:delete',
      callback: (element) => this.deleteDocument(String(element.id)),
    },
  ];

  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Name' },
    { def: 'email', key: 'email', label: 'email' },
    { def: 'age', key: 'age', label: 'email' },
  ];

  constructor(
    private alertService: AlertService,
    private firebaseExampleService: FirebaseExampleService
  ) {}

  ngOnInit() {
    this.getDocuments();
  }

  private handleError(error: any) {
    console.log(error);
    this.alertService.snackBar.open(this.errorMessage, 'close');
  }

  public getDocuments() {
    this.loadingStore.setState(true);

    this.firebaseExampleService
      .getAll<IDocDocumentDatabase[]>()
      .then((response) => {
        this.pagination = {
          ...this.pagination,
          totalItems: response.length,
        };

        this.documents = response;
        this.handlePaginate(response);
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public getDocument(id: string) {
    this.loadingStore.setState(true);

    this.firebaseExampleService
      .getById<IDocDocumentDatabase>(id)
      .then((response) => {
        this.alertService.snackBar.open(response.email, 'close');
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public createDocument() {
    this.loadingStore.setState(true);

    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase()}@example.com`;
    const randomAge = Math.floor(Math.random() * 100);

    this.firebaseExampleService
      .create<IDocDocumentDatabase>({
        age: randomAge,
        name: randomName,
        email: randomEmail,
      })
      .then(() => this.getDocuments())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public updateDocument(item: IDocDocumentDatabase) {
    this.loadingStore.setState(true);
    const editRandom = Math.floor(Math.random() * 100);
    const currentName = item.name.split('-')[1] || item.name;

    const name = `(Edit ${editRandom}) - ${currentName}`;

    this.firebaseExampleService
      .update<Partial<IDocDocumentDatabase>>(String(item.id), { name })
      .then(() => this.getDocuments())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public deleteDocument(id: string) {
    this.loadingStore.setState(true);

    this.firebaseExampleService
      .delete(id)
      .then(() => this.getDocuments())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handlePaginate(items = this.documents) {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(items, pageNumber, pageSize);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.handlePaginate();
  }
}
