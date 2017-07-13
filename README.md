![Logo](./logo.png)

Set a custom git commit message template.

Usage
-----

In your project:

```bash
npm install --save-dev git-message
```

This will automatically set up a custom git commit message template based
on http://chris.beams.io/posts/git-commit/.

To use a custom git commit message template, simply add
a `.gitmessage` file at the top level of your project file tree.
h

Running in Docker
-----------------

`git-message` will cowardly refuse to set up the git message when executed
in Docker: this is to avoid issues with mounted volumes (which git would
fail to modify in most cases due to file ownership differences).

License
-------

MIT
