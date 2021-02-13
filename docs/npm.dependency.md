[[ BACK (to readme.md) ]](../README.md) &nbsp; [[ API ]](api.index.md) &nbsp;
[[ Contributing ]](contributing.md) &nbsp;
[[ HELP (jsbr npm install) ]](npm.install.md) &nbsp; [[ Frameworks ]](frameworks.md)
&nbsp; [[ Grunt ]](grunt.md)

### dependency ###
<blockquote>
  <p>Update a depencency located in package.json files of one or more project directories.</p>

  <table border=0 width=100%>
    <tr><th colspan="3"><b>format</b></th></tr>
    <tr><th colspan="3">&gt; batchrun npm dependency &lt;options&gt; [directories]</th></tr>
    <tr><th colspan="3"><b>mandatory options</b></th></tr>
    <tr><td>--pkg</td>
        <td style="text-align:center">string</td>
        <td>packagename</td>
        </tr>
    <tr><td>--version</td>
        <td style="text-align:center">string</td>
        <td><a href="https://docs.npmjs.com/cli/v6/using-npm/semver">semver version</a></td>
        </tr>
    <tr><th colspan="3"><b>additional options</b></th></tr>
    <tr><td>--dev</td>
        <td style="text-align:center">boolean</td>
        <td>update a developer dependency</td>
        </tr>
    <tr><th colspan="3"><b>additional options</b> (will extend the arguments iterated by <code>jsbr fs clean</code>)</th></tr>
    <tr><td>--env:args:use:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname'</td>
        </tr>
    <tr><td>--env:args:append:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname' and append them to existing arguments.</td>
        </tr>
    <tr><td>--env:args:prepend:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname' and prepend them to existing arguments.</td>
        </tr>
    <tr><th colspan="3"><b>additional options</b> (will narrow the arguments iterated by <code>jsbr fs clean</code>)</th></tr>
    <tr><td>--args:from</td>
        <td style="text-align:center">integer</td>
        <td>start cleaning task at and including this position, in the list of directories (arguments)</td>
        </tr>
    <tr><td>--args:to</td>
        <td style="text-align:center">integer</td>
        <td>stop cleaning task at and including this position, in the list of directories (arguments)</td>
        </tr>
    <tr><td>--args:index</td>
        <td style="text-align:center">integer</td>
        <td>run cleaning task (only!) for this position, in the list of directories (arguments)<br />
            (will override any ranges set by --args:from and --args:to)</td>
        </tr>
    <tr><th colspan="3"><b>special options</b></th></tr>
    <tr><td>--debug</td>
        <td style="text-align:center">boolean</td>
        <td>display debug information</td>
        </tr>
    <tr><td>--help</td>
        <td style="text-align:center">boolean</td>
        <td>display help for command <code>jsbr fs clean</code></td>
        </tr>
  </table>      

  <p><b>examples:</b></p>
  <br />

  <p>
    Update a developer dependency <code>@babel/core</code> to version <code>^7.12.13</code>
    for all projects in the global list of projects

  ```bash
  > batchrun npm dependency --dev --pkg @babel/core --version "^7.12.13"
  ```
  </p>
  <p>
    Update a developer dependency <code>@babel/core</code> to version <code>^7.12.13</code>
    for all projects in the global list of projects, starting at index 7 and including all
    projects up to index 12 inclusive. (The first index, that could be addressed was '0')

  ```bash
  > batchrun npm dependency --dev --pkg @babel/core --version "^7.12.13" --args:from 7 --args:to 12
  ```
  </p>
  <p>
    Update a developer dependency <code>@babel/core</code> to version <code>^7.12.13</code>
    for a project located at <code>~/projects/my project</code>

  ```bash
  > batchrun npm dependency --dev --pkg @babel/core --version "^7.12.13" "~/projects/my project"
  ```
  </p>
</blockquote>
