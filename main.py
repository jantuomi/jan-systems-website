from flask import Flask, request
from flask import render_template
from flask_compress import Compress
import os
from os.path import isfile
from dataclasses import dataclass
from typing import Literal

app = Flask(__name__)
Compress(app)

### PAGES


@app.route("/")
def index():
    files_expanded = request.args.get("show_files", "0") == "1"
    dir = request.args.get("dir", "")
    if not files_expanded:
        return render_template("index.html", files_expanded=files_expanded)
    else:
        listing = get_file_listing_at_path(dir)
        return render_template(
            "index.html",
            files_expanded=files_expanded,
            listing=listing,
        )


### ACTIONS


@app.post("/click_files_drawer_toggle")
def click_files_drawer_toggle():
    files_expanded = request.form.get("files_expanded") == "true"
    listing = get_file_listing_at_path("")
    return render_template(
        "responses/click_files_drawer_toggle.html",
        files_expanded=not files_expanded,
        listing=listing,
    )


@app.post("/navigate_files/")
@app.post("/navigate_files/<path:dir_path>")
def navigate_files(dir_path=""):
    listing = get_file_listing_at_path(dir_path)
    return render_template(
        "responses/navigate_files.html",
        files_expanded=True,
        listing=listing,
    )


### TYPES


@dataclass
class ListingItem:
    kind: Literal["file", "dir"]
    name: str
    full_path: str
    static_path: str


# UTILS


def get_file_listing_at_path(path) -> list[ListingItem]:
    static_dir_segment = f"static/files/{path}"

    listing = os.listdir(static_dir_segment)
    listing = [to_listing_item(path, name) for name in listing]
    listing = sorted(listing, key=sort_key)

    if path != "":
        path_parts = path.split("/")[:-1]
        parent_dir_path = "/".join(path_parts)
        listing.insert(
            0,
            ListingItem(
                kind="dir",
                name="..",
                full_path=parent_dir_path,
                static_path=f"static/files/{parent_dir_path}",
            ),
        )

    return listing


def to_listing_item(parent_dir: str, name: str) -> ListingItem:
    if parent_dir != "":
        static_path = f"static/files/{parent_dir}/{name}"
        full_path = f"{parent_dir}/{name}"
    else:
        static_path = f"static/files/{name}"
        full_path = name

    kind = "file" if isfile(static_path) else "dir"
    return ListingItem(
        kind=kind,
        name=name,
        full_path=full_path,
        static_path=static_path,
    )


def sort_key(item: ListingItem) -> str:
    if item.kind == "file":
        return item.name
    return "0000" + item.name


def get_app():
    return app
