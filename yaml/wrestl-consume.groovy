@Grab('org.jyaml:jyaml:1.3')
import org.ho.yaml.Yaml

def cli = new CliBuilder(usage: 'wrestl-consume.groovy -[eh] [wrestls (defaults to finding all supported file types)]')
cli.with {
    h longOpt: 'help', 'Show usage information'
    e longOpt: 'environment', args: 1, argName: 'env', 'Will look for "wrestlename.{env}.properties" Defaults to no environment.'
    i longOpt: 'ignore', 'Run everything except the wrestls named '
}
options = cli.parse(args)
if (options.h){
    cli.usage()
    System.exit(1)
}

def wrestlFilePattern =  /.*\.yaml$/
def wrestls = {
    if(options.arguments()){
        if(options.i){
            new File(".").listFiles([accept:{d, f-> f ==~ wrestlFilePattern && !options.arguments().contains(f)}] as FilenameFilter)
        }else{
            options.arguments().each(){new File(it)}
        }
    }else {
        new File(".").listFiles([accept:{d, f-> f ==~ wrestlFilePattern}] as FilenameFilter)
    }
}()

wrestls.each {
    Yaml.load(it.text).each{ uriTemplate, serviceDetails ->
        println uriTemplate
    }

}