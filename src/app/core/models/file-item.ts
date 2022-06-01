export class FileItem {
  url?: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}
