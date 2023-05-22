# tbm-api-docs

## Dependencies

### Install sphinx

    apt-get install python3-sphinx

### Install python3 and pip3

    # Check for python3 & pip3 installation
    python3 --version
    pip3 --version
    # Install pip3 if it's not installed
    sudo apt install python3-pip

### Install rtd theme for sphinx

    pip3 install sphinx_rtd_theme

## Build the docs

    sphinx-build -b html docs/ build/html

## Open the docs in your browser

    ./build/html/index.html
