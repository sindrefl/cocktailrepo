import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class UploadImage extends Component {
    constructor(props){
        super(props);
            this.state = {

            }
        this.onDrop = this.onDrop.bind(this);
    }


    onDrop(accepted, rejected){
        this.props.onDrop(accepted,rejected);
    }
    render() {
        const {files, invalid} = this.props;
        console.log(files);
        return (
          <section>
            <div className="dropzone">
              <Dropzone  onDrop={this.onDrop}
                    accept="image/jpeg">
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <aside>
              <h2>Dropped files</h2>
              <ul>
                  {invalid && invalid.map(f => <li style={{fontColor: "red"}} key={f.name}>{f.name} - {f.size} bytes</li>)}
                {
                    files && files.map(f => <li key={f.name}>{f.name}</li>)
                }
              </ul>
            </aside>
          </section>
        );
      }
}

export default UploadImage;