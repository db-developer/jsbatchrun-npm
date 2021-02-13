
<br><a name="module_jsbatchrun-npm/dependency"></a>

## jsbatchrun-npm/dependency
> dependency.js: @org.slashlib/jsbatchrun-npm


* [jsbatchrun-npm/dependency](#module_jsbatchrun-npm/dependency)
    * [~invoke(args)](#module_jsbatchrun-npm/dependency..invoke)
    * [~config(projectdir)](#module_jsbatchrun-npm/dependency..config) ⇒ <code>object</code>


<br><a name="module_jsbatchrun-npm/dependency..invoke"></a>

### jsbatchrun-npm/dependency~invoke(args)
> Run `npm dependency` for a number of project directories.>  This updates the version of a depencency for a number of  projects.> >  Properties:>    --pkg     {string}  package name>    --version {string}  version>    --dev     {boolean} is a developer package


| Param | Type |
| --- | --- |
| args | <code>object</code> | 


<br><a name="module_jsbatchrun-npm/dependency..config"></a>

### jsbatchrun-npm/dependency~config(projectdir) ⇒ <code>object</code>
> Returns a grunt configuration for npm install

**Returns**: <code>object</code> - grunt configuration  

| Param | Type |
| --- | --- |
| projectdir | <code>string</code> | 

