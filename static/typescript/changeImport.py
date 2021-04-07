file_lists = [
    "../build/myFirstProject.js", 
    "../build/basicElementsOfScene.js"
]

target_strs = [ 
    "import * as THREE from 'three';", 
    "import 'stats';", 
    "import * as dat from 'dat.gui';"
]

replaced_strs = [ 
    "import * as THREE from '../node_modules/three/build/three.module.js';\n" ,
    "import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';\n",
    "import * as dat from '../node_modules/dat.gui/build/dat.gui.module.js';\n",
]

print('File exchange start.')

for file_name in file_lists:
    with open(file_name, 'r') as f:
        lines = f.readlines()

    with open(file_name, 'w') as f:
        for line in lines:
            for i in range(len(target_strs)):
                if line.startswith(target_strs[i]):
                    line = replaced_strs[i]
                #line.replace(target_strs[i], replaced_strs[i])
            f.write(line)
        
print('File exchange completed.')
