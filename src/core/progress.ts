/**
 * 参考出处：https://github.com/shihao905/upload-upyun
 */
const slog = require('single-line-log').stdout;
class ProgressBar {
  description: string
  length: number
  constructor(description: string, bar_length?: number) {
    this.description = description || 'Progress';
    this.length = bar_length || 25;
  }
  render(options: {
    completed: number,
    total: number
  }) {
    let percent: string = (options.completed / options.total).toFixed(4);
    var cell_num = Math.floor(+percent * this.length);
    // 拼接黑色条
    let cell = '';
    for (let i = 0; i < cell_num; i++) {
      cell += '█';
    }
    // 拼接灰色条
    let empty = '';
    for (let i = 0; i < this.length - cell_num; i++) {
      empty += '░';
    }
    let cmdText = this.description + ': ' + (100 * +percent).toFixed(2) + '% ' + cell + empty + ' ' + options.completed + '/' + options.total + '\n';
    slog(cmdText);
  }
}

export default ProgressBar