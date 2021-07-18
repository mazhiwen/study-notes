
# 导入相应模块
import xlrd
from xlutils.copy import copy




# 打开 excel 文件
readbook = xlrd.open_workbook("./test.xls")

# 复制一份
wb = copy(readbook)

# 选取第一个表单
sh1 = wb.get_sheet(0)

# 在第五行新增写入数据
sh1.write(4, 0, '王欢')
sh1.write(4, 1, '通信工程')
sh1.write(4, 2, '机器学习')
sh1.write(4, 3, 89)

# 选取第二个表单
sh1 = wb.get_sheet(1)

# 替换总成绩数据
sh1.write(1, 0, 362)

# 保存
wb.save('test1.xls')
