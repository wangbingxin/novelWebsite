const fs = require('fs')
const path = require('path')

var root = '../../src'

function readDir(dir, level){
	// try{
		return fs.readdirSync(dir).map((item, index, arr) => {
			var current = path.join(dir, item)
			var stat = fs.statSync(current)

			if(stat.isDirectory()){
				return {
					name: item,
					isLast: index === arr.length-1,
					level,
					children: readDir(current, level+1)
				}
			}else{
				return {
					name: item,
					isLast: index === arr.length-1,
					level,
					children: false
				}
			}
			
		})
	// }catch(err){
	// 	return false
	// }
}

var dir = readDir(root, 1)

var str=''

function formatDir(obj, tab){
	obj.forEach(item => {
		var row = item.isLast ? tab + '└── ' + item.name :tab + '├── ' + item.name
		str += row + '\n'
		if(item.children){
			formatDir(item.children, item.isLast ? tab + '    ' : tab + '│   ')
		}
	})
}

formatDir(dir, '')

console.log(str)

fs.writeFileSync('./tree.txt', str)
