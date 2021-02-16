[[ BACK (to readme.md) ]](../README.md) &nbsp; [[ API ]](api.index.md) &nbsp;
[[ Contributing ]](contributing.md) &nbsp;
[[ HELP (jsbr npm dependency) ]](npm.dependency.md) &nbsp;
[[ HELP (jsbr npm outdated) ]](npm.outdated.md) &nbsp;
[[ HELP (jsbr npm run) ]](npm.run.md) &nbsp;
[[ Frameworks ]](frameworks.md) &nbsp; [[ Grunt ]](grunt.md)

### install ###
<blockquote>
  <p>Run an <code>npm install</code> for one or more projects.</p>

  <table border=0 width=100%>
    <tr><th colspan="3"><b>format</b></th></tr>
    <tr><th colspan="3">&gt; jsbr npm install &lt;options&gt; [directories]</th></tr>
    <tr><th colspan="3"><b>options</b></th></tr>
    <tr><td>--cleancache</td>
        <td style="text-align:center">boolean</td>
        <td>clean cache before install</td>
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
    <tr><td>--env:opt:[optionname][propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>inject an option by using a property value (configuration file)</td>
        </tr>
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
    Run 'npm install' for all projects in the global list of projects

  ```bash
  > jsbr npm install
  ```
  </p>
  <p>
    Clean cache and run 'npm install' for all projects in the global list of
    projects, starting at index 7 and including all projects up to index 12
    inclusive. (The first index, that could be addressed was '0')

  ```bash
  > jsbr npm install --cleancache --args:from 7 --args:to 12
  ```
  </p>
  <p>
    Run 'npm install' for a project located at <code>~/projects/my project</code>

  ```bash
  > jsbr npm install "~/projects/my project"
  ```
  </p>
</blockquote>
